import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { requireAuth } from '../middleware/auth';
import { requireAdmin } from '../middleware/admin';
import { validate } from '../middleware/validate';
import { sendStatusEmail } from '../utils/email';
import {
  AdminRegistrationParamsSchema,
  AdminStatusSchema,
  AdminCheckinSchema,
  AdminListQuerySchema,
  AdminCheckinSearchSchema,
  AdminExportQuerySchema,
} from '../types/admin';
import { Registration } from '../types/registration';

const router = Router();

// All admin routes require authentication + admin role
router.use(requireAuth, requireAdmin);

// ─────────────────────────────────────────────
// GET /api/admin/registrations
// Paginated list with optional status filter and search
// ─────────────────────────────────────────────
router.get(
  '/registrations',
  validate({ query: AdminListQuerySchema }),
  async (req: Request, res: Response) => {
    try {
      const { status, search, page, limit } = req.query as unknown as {
        status?: string;
        search?: string;
        page: number;
        limit: number;
      };

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      let query = supabase
        .from('registrations')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (status) {
        query = query.eq('status', status);
      }

      if (search) {
        const term = `%${search}%`;
        query = query.or(
          `first_name.ilike.${term},last_name.ilike.${term},email.ilike.${term}`
        );
      }

      const { data, error, count } = await query;

      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      res.json({ data, total: count ?? 0, page, limit });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// ─────────────────────────────────────────────
// GET /api/admin/registrations/:id
// Single registration detail
// ─────────────────────────────────────────────
router.get(
  '/registrations/:id',
  validate({ params: AdminRegistrationParamsSchema }),
  async (req: Request, res: Response) => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('id', req.params.id)
        .single();

      if (error) {
        res.status(error.code === 'PGRST116' ? 404 : 500).json({ error: error.message });
        return;
      }

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// ─────────────────────────────────────────────
// PATCH /api/admin/registrations/:id/status
// Update application status + send notification email
// ─────────────────────────────────────────────
router.patch(
  '/registrations/:id/status',
  validate({ params: AdminRegistrationParamsSchema, body: AdminStatusSchema }),
  async (req: Request, res: Response) => {
    try {
      const { status } = req.body as { status: string };

      const { data, error } = await supabase
        .from('registrations')
        .update({ status })
        .eq('id', req.params.id)
        .select()
        .single();

      if (error) {
        res.status(error.code === 'PGRST116' ? 404 : 500).json({ error: error.message });
        return;
      }

      // Fire-and-forget email — a failed send must not cause a 500
      if (status !== 'pending') {
        sendStatusEmail(data as Registration, status).catch((e: unknown) =>
          console.error('Status email failed:', e)
        );
      }

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// ─────────────────────────────────────────────
// PATCH /api/admin/registrations/:id/checkin
// Toggle check-in state
// ─────────────────────────────────────────────
router.patch(
  '/registrations/:id/checkin',
  validate({ params: AdminRegistrationParamsSchema, body: AdminCheckinSchema }),
  async (req: Request, res: Response) => {
    try {
      const { checked_in } = req.body as { checked_in: boolean };

      const { data, error } = await supabase
        .from('registrations')
        .update({
          checked_in,
          checked_in_at: checked_in ? new Date().toISOString() : null,
        })
        .eq('id', req.params.id)
        .select()
        .single();

      if (error) {
        res.status(error.code === 'PGRST116' ? 404 : 500).json({ error: error.message });
        return;
      }

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// ─────────────────────────────────────────────
// GET /api/admin/stats
// Aggregate counts — fetches all rows, aggregates in JS
// ─────────────────────────────────────────────
router.get('/stats', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('status, checked_in, university, level_of_study, dietary_restrictions, graduation_year, gender');

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    const rows = (data ?? []) as Pick<
      Registration,
      'status' | 'checked_in' | 'university' | 'level_of_study' | 'dietary_restrictions' | 'graduation_year' | 'gender'
    >[];

    const tally = (
      key: keyof typeof rows[0]
    ): Record<string, number> =>
      rows.reduce<Record<string, number>>((acc, row) => {
        const val = String(row[key] ?? 'Unknown');
        acc[val] = (acc[val] ?? 0) + 1;
        return acc;
      }, {});

    res.json({
      total: rows.length,
      by_status: tally('status'),
      checked_in: rows.filter((r) => r.checked_in).length,
      by_university: tally('university'),
      by_level_of_study: tally('level_of_study'),
      by_dietary_restrictions: tally('dietary_restrictions'),
      by_graduation_year: tally('graduation_year'),
      by_gender: tally('gender'),
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─────────────────────────────────────────────
// GET /api/admin/export?format=csv|json
// Full data export
// ─────────────────────────────────────────────
router.get(
  '/export',
  validate({ query: AdminExportQuerySchema }),
  async (req: Request, res: Response) => {
    try {
      const format = (req.query.format as string) ?? 'json';

      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      const rows = (data ?? []) as Record<string, unknown>[];

      if (format === 'json') {
        res.json(rows);
        return;
      }

      // Build CSV
      if (rows.length === 0) {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="registrations.csv"');
        res.send('');
        return;
      }

      const headers = Object.keys(rows[0]);
      const escape = (val: unknown): string => {
        const s = val == null ? '' : String(val);
        return s.includes(',') || s.includes('"') || s.includes('\n')
          ? `"${s.replace(/"/g, '""')}"`
          : s;
      };

      const csv = [
        headers.join(','),
        ...rows.map((row) => headers.map((h) => escape(row[h])).join(',')),
      ].join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="registrations.csv"');
      res.send(csv);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// ─────────────────────────────────────────────
// GET /api/admin/checkin/search?q=...
// Live search for day-of check-in (accepted only, max 20)
// ─────────────────────────────────────────────
router.get(
  '/checkin/search',
  validate({ query: AdminCheckinSearchSchema }),
  async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string;
      const term = `%${q}%`;

      const { data, error } = await supabase
        .from('registrations')
        .select('id, first_name, last_name, email, status, checked_in')
        .eq('status', 'accepted')
        .or(`first_name.ilike.${term},last_name.ilike.${term},email.ilike.${term}`)
        .limit(20);

      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      res.json(data ?? []);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;

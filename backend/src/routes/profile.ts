import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { supabase } from '../config/supabase';
import { requireAuth } from '../middleware/auth';

const router = Router();

// All routes in this file require authentication
router.use(requireAuth);

const UpdateProfileSchema = z
  .object({
    first_name: z.string().min(1).optional(),
    last_name: z.string().min(1).optional(),
    full_name: z.string().optional(),
    avatar_url: z.string().optional(),
    phone_number: z.string().optional(),
    age: z.coerce.number().int().positive().optional(),
    graduation_year: z.coerce.number().int().min(2000).max(2040).optional(),
    university: z.string().optional(),
    major: z.string().optional(),
    gender: z.string().optional(),
    dietary_restrictions: z.string().optional(),
    shirt_size: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required',
  });

/**
 * GET /api/profile
 * Returns the authenticated user's profile.
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user!.id)
      .single();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/profile
 * Upserts the authenticated user's profile with all form fields.
 * The user id always comes from the verified JWT — never from the request body.
 */
router.put('/', async (req: Request, res: Response) => {
  try {
    const parsed = UpdateProfileSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues });
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: req.user!.id, ...parsed.data }, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

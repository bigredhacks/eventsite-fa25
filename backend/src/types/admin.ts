import { z } from 'zod';

export const AdminRegistrationParamsSchema = z.object({
  id: z.coerce.number().int().positive('id must be a positive integer'),
});

export const AdminStatusSchema = z.object({
  status: z.enum(['pending', 'accepted', 'waitlisted', 'rejected']),
});

export const AdminCheckinSchema = z.object({
  checked_in: z.boolean(),
});

export const AdminListQuerySchema = z.object({
  status: z.enum(['pending', 'accepted', 'waitlisted', 'rejected']).optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(200).default(50),
});

export const AdminCheckinSearchSchema = z.object({
  q: z.string().min(1, 'q is required'),
});

export const AdminExportQuerySchema = z.object({
  format: z.enum(['json', 'csv']).default('json'),
});

export type AdminRegistrationParams = z.infer<typeof AdminRegistrationParamsSchema>;
export type AdminStatusBody = z.infer<typeof AdminStatusSchema>;
export type AdminCheckinBody = z.infer<typeof AdminCheckinSchema>;
export type AdminListQuery = z.infer<typeof AdminListQuerySchema>;

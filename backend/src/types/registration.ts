import { z } from 'zod';

export const CreateRegistrationSchema = z.object({
  first_name: z.string().min(1, 'first_name is required'),
  last_name: z.string().min(1, 'last_name is required'),
});

export const UpdateRegistrationSchema = z
  .object({
    first_name: z.string().min(1, 'first_name must be non-empty').optional(),
    last_name: z.string().min(1, 'last_name must be non-empty').optional(),
  })
  .refine((data) => data.first_name !== undefined || data.last_name !== undefined, {
    message: 'At least one field (first_name or last_name) is required',
  });

export const RegistrationParamsSchema = z.object({
  id: z.coerce.number().int().positive('id must be a positive integer'),
});

export interface Registration {
  id: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

export type CreateRegistrationBody = z.infer<typeof CreateRegistrationSchema>;
export type UpdateRegistrationBody = z.infer<typeof UpdateRegistrationSchema>;

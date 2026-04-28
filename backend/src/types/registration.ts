import { z } from 'zod';

export const CreateRegistrationSchema = z.object({
  first_name: z.string().min(1, 'first_name is required'),
  last_name: z.string().min(1, 'last_name is required'),
  email: z.string().email().optional(),
  phone_number: z.string().optional(),
  age: z.coerce.number().int().optional(),
  graduation_year: z.coerce.number().int().optional(),
  university: z.string().optional(),
  major: z.string().optional(),
  gender: z.string().optional(),
  dietary_restrictions: z.string().optional(),
  shirt_size: z.string().optional(),
  country: z.string().optional(),
  level_of_study: z.string().optional(),
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
  id: number;
  first_name: string;
  last_name: string;
  created_at: string;
  status: 'pending' | 'accepted' | 'waitlisted' | 'rejected';
  checked_in: boolean;
  checked_in_at: string | null;
  user_id: string | null;
  email: string | null;
  phone_number: string | null;
  age: number | null;
  graduation_year: number | null;
  university: string | null;
  major: string | null;
  gender: string | null;
  dietary_restrictions: string | null;
  shirt_size: string | null;
  country: string | null;
  level_of_study: string | null;
}

export type CreateRegistrationBody = z.infer<typeof CreateRegistrationSchema>;
export type UpdateRegistrationBody = z.infer<typeof UpdateRegistrationSchema>;

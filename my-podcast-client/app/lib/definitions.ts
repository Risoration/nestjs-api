import * as z from 'zod';

export const SignupFormSchema = z.object({
  name: z.string().min(2).trim(),
  email: z.email({ error: 'Invalid email entered' }),
  password: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, {
      error: 'Contain at least one character',
    })
    .regex(/[0-9]/, { error: 'Contain at least one digit' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character',
    })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
    }
  | undefined;

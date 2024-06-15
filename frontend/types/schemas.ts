import { z } from 'zod';

export const addHoursSchema = z.object({
  hours: z
    .number()
    .gt(0, { message: 'Hours must be more than 0' })
    .lte(100, { message: 'Hours must be less than 100' })
    .multipleOf(0.01, { message: 'Hours must only contain 2 decimal places' }),
  description: z
    .string()
    .max(2000, { message: 'Description must be less than 2000 characters' }),
});

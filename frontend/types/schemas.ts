import { z } from 'zod';
import { hoursTag } from './hours';

export const addHoursSchema = z.object({
  hours: z
    .number()
    .gt(0, { message: 'Hours must be greater than 0' })
    .lte(100, { message: 'Hours must be less than 100' })
    .multipleOf(0.01, { message: 'Hours must only contain 2 decimal places' }),
  description: z
    .string()
    .min(2, { message: 'Description must contain at least 2 characters' })
    .max(2000, { message: 'Description must be less than 2000 characters' }),
  imageUrl: z.string().url({ message: 'Invalid URL' }),
  tags: z.array(z.nativeEnum(hoursTag))
});

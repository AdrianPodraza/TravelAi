'use server';

import { z } from 'zod';

const travelFormSchema = z.object({
  destination: z
    .string()
    .min(1, 'Destination is required')
    .max(30, 'Destination must be 30 characters or fewer'),
  days: z.string().regex(/^\d+$/, 'Number of days must be a number'),
  style: z.string().min(1, 'Travel style is required'),
  interests: z.string().min(1, 'Interests are required'),
  requirements: z.string().optional(),
});
export async function submitTravelForm(formData: FormData) {
  const raw = {
    destination: formData.get('destination'),
    days: formData.get('days'),
    style: formData.get('style'),
    interests: formData.get('interests'),
    requirements: formData.get('requirements'),
  };

  const parsed = travelFormSchema.safeParse(raw);

  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    return { errors: parsed.error.flatten().fieldErrors };
  }

  console.log('✅ Valid submission:', parsed.data);
  return { success: true };
}

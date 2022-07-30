import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

export const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number().min(2),
  seatsQty: z.number().min(2),
});

export type ICar = z.infer<typeof CarZodSchema>;
import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

export const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number(),
  seatsQty: z.number(),
});

export type ICar = z.infer<typeof CarZodSchema>;
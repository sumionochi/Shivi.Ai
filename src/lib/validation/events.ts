import { z } from "zod";

export const createEventSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
});

export const updateEventSchema = createEventSchema.extend({
    id: z.string().min(1),
  });
  
  export const deleteEventSchema = z.object({
    id: z.string().min(1),
  });

export type CreateEventSchema = z.infer<typeof createEventSchema>;

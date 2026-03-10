import z from 'zod';

const createEntrySchema = z.object({
    title: z.string({error: "Title is required"}).min(1, "Title field cannot be empty"),
    artist: z.string({error: "Artist is required"}).min(1, "Artist field cannot be empty"),
    genres: z.array(z.string()).min(1, "At least one genre is required"),
    rating: z
    .coerce
    .number()
    .int()
    .min(1, "Rating must be between 1 and 10")
    .max(10, "Rating must be between 1 and 10")
    .optional(),
    note: z.string().optional()
});

export default createEntrySchema;


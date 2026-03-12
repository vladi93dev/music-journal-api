import z from 'zod';

const createEntrySchema = z.object({
    title: z.string({error: "Title is required"}).min(1, "Title field cannot be empty"),
    artist: z.string({error: "Artist is required"}).min(1, "Artist field cannot be empty"),
    genre: z.enum(['Rock', 'Pop', 'Jazz', 'Hip-Hop', 'Classical', 'R&B', 'Electronic', 'Country', 'Metal', 'Folk'], {
        error: 'Invalid genre. Accepted genres: Rock, Pop, Jazz, Hip-Hop, Classical, R&B, Electronic, Country, Metal, Folk'
    }),
    rating: z
    .coerce
    .number()
    .int()
    .min(1, "Rating must be between 1 and 10")
    .max(10, "Rating must be between 1 and 10")
    .optional(),
    note: z.string().optional()
});

const updateEntrySchema = z.object({
    title: z.string({error: "Title is required"}).min(1, "Title field cannot be empty").optional(),
    artist: z.string({error: "Artist is required"}).min(1, "Artist field cannot be empty").optional(),
    genre: z.string().min(1, "Genre is required"),
    rating: z
    .coerce
    .number()
    .int()
    .min(1, "Rating must be between 1 and 10")
    .max(10, "Rating must be between 1 and 10")
    .optional(),
    note: z.string().optional()
})

export { createEntrySchema, updateEntrySchema };


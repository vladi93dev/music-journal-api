import z from 'zod';

const createEntrySchema = z.object({
    title: z.string({error: "Title is required"}).min(1, "Title field cannot be empty"),
    artist: z.string({error: "Artist is required"}).min(1, "Artist field cannot be empty"),
    genre: z.string().transform((val) => val.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('-')).pipe(z.enum(['Rock', 'Pop', 'Jazz', 'Hip-Hop', 'Classical', 'R&B', 'Electronic', 'Country', 'Metal', 'Folk'], {
        error: 'Invalid genre. Accepted genres: Rock, Pop, Jazz, Hip-Hop, Classical, R&B, Electronic, Country, Metal, Folk'
    })).optional(),
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
    genre: z.string().transform((val) => val.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('-')).pipe(z.enum(['Rock', 'Pop', 'Jazz', 'Hip-Hop', 'Classical', 'R&B', 'Electronic', 'Country', 'Metal', 'Folk'], {
        error: 'Invalid genre. Accepted genres: Rock, Pop, Jazz, Hip-Hop, Classical, R&B, Electronic, Country, Metal, Folk'
    })).optional(),
    rating: z
    .coerce
    .number()
    .int()
    .min(1, "Rating must be between 1 and 10")
    .max(10, "Rating must be between 1 and 10")
    .optional(),
    note: z.string().optional()
});

const getEntryQuerySchema = z.object({
    artist: z.string().min(1).transform(val => decodeURIComponent(val)).optional(),
    rating: z.coerce.number().int()
    .min(1, "Rating must be between 1 - 10")
    .max(10, "Rating must be between 1 - 10")
    .optional(),
    genre: z.string().transform((val) => val.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('-')).pipe(z.enum(['Rock', 'Pop', 'Jazz', 'Hip-Hop', 'Classical', 'R&B', 'Electronic', 'Country', 'Metal', 'Folk'], {
        error: 'Invalid genre. Accepted genres: Rock, Pop, Jazz, Hip-Hop, Classical, R&B, Electronic, Country, Metal, Folk'
    })).optional()
});

export { createEntrySchema, updateEntrySchema, getEntryQuerySchema };


import { prisma } from '../config/db.js';
import { generateToken } from '../config/generateToken.js';

const getEntries = async (req, res) => {
    const { artist, rating, genre } = req.validated;

    try {
        const entries = await prisma.entry.findMany({
            where: {
                userId: req.user.userId,
                ...( artist && { artist: {equals: artist, mode: 'insensitive'}}),
                ...( rating &&  { rating: parseInt(rating)} ),
                ...( genre && { genre: { equals: genre, mode: 'insensitive' }})
            }
        });
        res.status(200).json({ entries })
    } catch(error) {
        res.status(401).json({ message: error })
    }
}

const getEntryById = async (req, res) => {
    try {
        const entry = await prisma.entry.findUnique({
            where: {
                id: req.params.id
            }
        });

        if(!entry || entry.userId !== req.user.userId) {
            return res.status(404).json({ message: "Entry not found" });
        }

        res.status(200).json(entry);

        
    } catch(error) {
        res.status(400).json()
    }
}

const createEntry = async (req, res) => {
    const { title, artist, genre, rating, note } = req.validated;

    try {
        const newEntry = await prisma.entry.create({ data: {
            title,
            artist,
            genre,
            rating,
            note,
            userId: req.user.userId
        }});
        res.status(200).json({ message: `${newEntry.title} added` });
    } catch(error) {
        res.status(400).json({ message: `error: ${error.message}`});
    }
}

const updateEntryById = async (req, res) => {
    try {
        const entry = await prisma.entry.findUnique({where: { id: req.params.id }});

        if(!entry || entry.userId !== req.user.userId) {
            return res.status(404).json({message: "Entry not found"});
        }
        
        const entryUpdated = await prisma.entry.update({
            where: { id: req.params.id },
            data: req.validated 
        });

        res.status(200).json(`${entry.title} has been updated`);
        
    } catch(error) {
        return res.status(400).json({ message: `error: ${error}`})
    }
}

const deleteEntryById = async(req, res) => {
    try {
        const entry = await prisma.entry.findUnique({
            where: {
                id: req.params.id
            }
        });

        if(!entry || entry.userId !== req.user.userId) {
            return res.status(400).json({ message: "Entry not found"});
        }

        await prisma.entry.delete({
            where: {
                id: req.params.id
            }
        });

        return res.status(200).json({message: `${entry.title} entry is deleted`});


    } catch(error) {
        return res.status(400).json(error);
    }

}

const getEntriesGenres = async(req, res) => {

    const entries = await prisma.entry.findMany({
        where: { userId: req.user.userId },
        select: { genre: true },
        distinct: ['genre']
    });

    res.status(200).json(entries.map(entry => entry.genre));
}

const getStats = async(req, res) => {
    try {
        const [totalEntries, ratingData, highestEntry, lowestEntry, genreData, ratingDistData, latestEntry ] = await Promise.all([

            prisma.entry.count({
                where: { userId: req.user.userId }
            }),

            prisma.entry.aggregate({
                where: { userId: req.user.userId },
                _avg: { rating: true }
            }),

            prisma.entry.findFirst({
                where: { userId: req.user.userId },
                orderBy: [{ rating: 'desc' }, {createdAt: 'desc'}],
                select: { title: true, artist: true, rating: true }
            }),

             prisma.entry.findFirst({
                where: { userId: req.user.userId },
                orderBy: [{ rating: 'asc' }, {createdAt: 'desc'}],
                select: { title: true, artist: true, rating: true }
            }),

            prisma.entry.groupBy({
                by: ['genre'],
                where: { userId: req.user.userId },
                _count: { genre: true },
                orderBy: { _count: { genre: 'desc'}}
            }),

            prisma.entry.groupBy({
                by: ['rating'],
                where: { userId: req.user.userId },
                _count: {rating: true},
                orderBy: {_count: {rating: 'desc'}}
            }),

            prisma.entry.findFirst({
                where: { userId: req.user.userId}, 
                orderBy: [{createdAt: 'desc'}],
                select: {title: true, artist: true, createdAt: true}
            })
        ])

         res.status(500).json({
                totalEntries,
                averageRating: parseFloat(ratingData._avg.rating.toFixed(1)),
                highest: highestEntry,
                lowest: lowestEntry,
                genreBreakdown: genreData.map(val => ({
                   genre: val.genre,
                   count: val._count.genre 
                })),
                ratingDistData: ratingDistData.map(val => ({
                    rating: val.rating,
                    count: val._count.rating
                })),
                latestEntry: latestEntry
          })
        

    } catch(error) {
        res.status(400).json({ message: error.message });
    }
    

    
}

export { createEntry, getEntries, getEntryById, updateEntryById, deleteEntryById, getEntriesGenres, getStats };
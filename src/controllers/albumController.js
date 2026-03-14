import { prisma } from '../config/db.js';
import { generateToken } from '../config/generateToken.js';

const getEntries = async (req, res) => {
    const { artist, rating, genre } = req.validated;
    console.log(req.query);
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
    const { title, artist, genre, rating, note, userId } = req.body;

    try {
        const newEntry = await prisma.entry.create({ data: {
            title,
            artist,
            genre,
            rating,
            note,
            userId: req.user.userId
        }});
        res.status(200).json({ message: `${newEntry.artist} added` });
    } catch(error) {
        res.status(400).json({ message: `error: ${error.message}`});
    }
}

const updateEntryById = async (req, res) => {
    try {
        const entry = await prisma.entry.update({
            where: { id: req.params.id },
            data: req.body 
        });

        if(!entry || entry.userId !== req.user.userId) {
            return res.status(404).json({ error: "Entry not found"})
        }

        res.status(200).json(entry);
        
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
    console.log('Genres reached');
    const entries = await prisma.entry.findMany({
        where: { userId: req.user.userId },
        select: { genre: true }
    });

    res.status(200).json(entries.map(entry => entry.genre));
}


export { createEntry, getEntries, getEntryById, updateEntryById, deleteEntryById, getEntriesGenres };
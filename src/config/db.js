import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" 
    ? ['query', 'warn', 'error'] 
    : ['error'] 
});


const connectDB = async() => {
    try {
        await prisma.$connect();
        console.log("Connected to DB");
    } catch(error) {
        console.error(`DB Error: ${error}`);
        process.exit(1);
    }
};

const disconnectDB = async() => {
    await prisma.$disconnect();
}


export default { connectDB, disconnectDB, prisma };




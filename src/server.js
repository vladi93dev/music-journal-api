import { connectDB, disconnectDB, prisma } from './config/db.js';
import { config } from 'dotenv';
import cors from 'cors';
import express from 'express';

import usersRoutes from './routes/users.route.js';
import albumsRoutes from './routes/albums.route.js';
import authRoutes from './routes/auth.route.js';

config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/api/users', usersRoutes);
app.use('/api/entries', albumsRoutes);
app.use('/api/auth', authRoutes);


const server = app.listen(process.env.PORT || 3001, "0.0.0.0", () => {
    console.log(`Listening on PORT: ${process.env.PORT}`);
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});



import express from 'express';
import config from './config/index.js';
import routes from './routes/referralRoutes.js';
import prisma from './config/prisma.js';
import { errorHandler } from './utils/errorHandler.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

// Middleware
app.use(cors({
  origin: 'https://accredian-frontend-task-eight-iota.vercel.app/', 
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

// Routes
app.use('/api', routes);



// Error handling
app.use(errorHandler);

// Database connection check
prisma.$connect()
  .then(() => {
    console.log('Database connected');
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });
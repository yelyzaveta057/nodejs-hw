
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from "./routes/authRoutes.js";


const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(cookieParser());
app.use(logger);
app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(notesRoutes);

// 404 — якщо маршрут не знайдено
app.use(notFoundHandler);
app.use(errors());

// Error — якщо під час запиту виникла помилка
app.use(errorHandler);



await connectMongoDB();


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import { config } from './config/app.config';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';

const app = express();

const BASE_PATH = config.BASE_PATH;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    origin: config.APP_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(`${BASE_PATH}/auth`, authRoutes);

app.use(errorHandler);

// default error
app.use((_err: any, req: Request, res: Response, next: () => void) => {
  if (res.headersSent) {
    return next();
  }
  res.status(500).json({ error: 'There was a server side error!' });
});

export default app;

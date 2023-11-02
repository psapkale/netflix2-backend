import express from 'express';
import router from './routes/user.js';
import { errorMiddleware } from './middlewares/error.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

config({
   path: './data/config.env',
});

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
   cors({
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
   })
);

app.get('/', (req, res) => {
   res.send('Nice Working');
});

app.use('/v1/user', router);
app.use(errorMiddleware);

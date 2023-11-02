import express from 'express';
import router from './routes/user.js';
import { errorMiddleware } from './middlewares/error.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';

config({
   path: './data/config.env',
});

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
   res.send('Nice Working');
});

app.use('/v1/user', router);
app.use(errorMiddleware);

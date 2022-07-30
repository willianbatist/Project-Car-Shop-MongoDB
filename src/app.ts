import express from 'express';
import errorHandler from './middlewares/error';
import carsRouter from './routes/cars.routes';

const app = express();
app.use(express.json());
app.use(carsRouter);
app.use(errorHandler);

export default app;

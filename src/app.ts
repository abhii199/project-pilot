import express from 'express';

const app = express();

//router imports
import authRouter from './routes/auth.Routes';
import healthCheckRouter from './routes/healthcheck.Routes';

app.use(express.json());

app.use('/api/v1/healthcheck', healthCheckRouter);
app.use('/api/v1/auth', authRouter);


export default app;
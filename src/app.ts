import express from 'express';
import cors from "cors";
import apiRouter from "./api";

const app = express();

const corsOptions = {
    origin: 'https://umkm-catalogue-frontend.vercel.app',
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.get('/test-cors', (req, res) => {
    res.json({ message: 'CORS test successful' });
});

app.get('/', (req, res) => {
    res.json({
        message: 'ooomaga',
    });
});

app.use('/api/v1', apiRouter);

app.use((req, res, next) => {
    console.log('Origin:', req.get('origin'));
    console.log('Headers:', req.headers);
    next();
});

export default app;
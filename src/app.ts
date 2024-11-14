import express from 'express';
import cors from "cors";
import apiRouter from "./api";

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'ooomaga',
    });
});

app.use('/api/v1', apiRouter);

export default app;
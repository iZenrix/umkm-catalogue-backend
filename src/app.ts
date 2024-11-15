import express from 'express';
import cors from "cors";
import apiRouter from "./api";
import {createProxyMiddleware} from "http-proxy-middleware";

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://umkm-catalogue-frontend.vercel.app/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const corsOptions = {
    origin: 'https://umkm-catalogue-frontend.vercel.app/',
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

app.use('/api/v1', createProxyMiddleware({
    target: 'http://localhost:8080/',
    changeOrigin: true,
    secure: false
}), apiRouter);

export default app;
import express from 'express';
import cors from "cors";
import apiRouter from "./api";
import {createProxyMiddleware} from "http-proxy-middleware";

const app = express();

const corsOptions = {
    AccessControlAllowOrigin: '*',
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
    target: 'https://umkm-catalogue-backend.vercel.app',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
}), apiRouter);

export default app;
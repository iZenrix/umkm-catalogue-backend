import express from 'express';
import userRoutes from "./routes/UserRoutes";
import authRoutes from "./routes/AuthRoutes";
import categoryRoutes from "./routes/CategoryRoutes";
import typeRoutes from "./routes/TypeRoutes";
import umkmRoutes from "./routes/umkmRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import cors from "cors";

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

app.use('/users', userRoutes);
app.use('/', authRoutes);
app.use('/category', categoryRoutes);
app.use('/type', typeRoutes);
app.use('/umkm', umkmRoutes);
app.use('/review', reviewRoutes);

app.get('/', (req, res) => {
    res.send('UMKM Catalogue Backend');
});

export default app;
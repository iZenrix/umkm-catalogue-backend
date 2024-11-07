import express from 'express';
import userRoutes from "./routes/UserRoutes";
import authRoutes from "./routes/AuthRoutes";
import categoryRoutes from "./routes/CategoryRoutes";
import typeRoutes from "./routes/TypeRoutes";
import umkmRoutes from "./routes/umkmRoutes";

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/', authRoutes);
app.use('/category', categoryRoutes);
app.use('/type', typeRoutes);
app.use('/umkm', umkmRoutes);

export default app;
import express from 'express';
import userRoutes from "./routes/UserRoutes";
import authRoutes from "./routes/AuthRoutes";
import categoryRoutes from "./routes/CategoryRoutes";

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/', authRoutes);
app.use('/category', categoryRoutes);

export default app;
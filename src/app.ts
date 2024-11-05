import express from 'express';
import userRoutes from "./routes/UserRoutes";
import authRoutes from "./routes/AuthRoutes";

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/', authRoutes);

export default app;
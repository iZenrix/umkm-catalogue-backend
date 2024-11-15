import {Router} from "express";

import authRoutes from "../routes/AuthRoutes";
import categoryRoutes from "../routes/CategoryRoutes";
import typeRoutes from "../routes/TypeRoutes";
import umkmRoutes from "../routes/UmkmRoutes";
import reviewRoutes from "../routes/ReviewRoutes";
import userRoutes from "../routes/UserRoutes";
import productRoutes from "../routes/ProductRoutes";

const index = Router();

index.get('/', (req, res) => {
    res.json({
        message: 'API - 👋🌎🌍🌏',
    });
});

index.use("/", authRoutes);
index.use("/category", categoryRoutes);
index.use("/type", typeRoutes);
index.use("/umkm", umkmRoutes);
index.use("/review", reviewRoutes);
index.use("/user", userRoutes);
index.use("/product", productRoutes);

export default index;

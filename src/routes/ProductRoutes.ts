import {Router} from 'express';
import {createSingleProduct, getAllProducts, updateSingleProduct, deleteSingleProduct} from "../controllers/productController";
import authenticate from '../middlewares/authenticate';
import multer from "multer";

const router = Router();
const upload = multer({storage: multer.memoryStorage()});

router.post('/', upload.fields([
    {name: 'productImages', maxCount: 3}
]), authenticate, createSingleProduct);
router.get('/all/:id', authenticate, getAllProducts);
router.put('/:id', upload.fields([
    {name: 'productImages', maxCount: 3}
]), authenticate, updateSingleProduct);
router.delete('/:id', authenticate, deleteSingleProduct);

export default router;
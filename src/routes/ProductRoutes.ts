import {Router} from 'express';
import {createSingleProduct, getAllProducts, updateSingleProduct, deleteSingleProduct} from "../controllers/productController";
import authenticate from '../middlewares/authenticate';
import multer from "multer";

const router = Router();
const upload = multer({storage: multer.memoryStorage()});

router.post('/', upload.array('productImages', 3), authenticate, createSingleProduct);
router.get('/all/:id', authenticate, getAllProducts);
router.put('/:id', upload.array('productImages', 3), authenticate, updateSingleProduct);
router.delete('/:id', authenticate, deleteSingleProduct);

export default router;
import {Router} from 'express';
import {createSingleUmkm, getAllUmkm} from "../controllers/umkmController";
import authenticate from '../middlewares/authenticate';
import multer from "multer";

const router = Router();
const upload = multer({storage: multer.memoryStorage()});

router.post('/', upload.fields([
    {name: 'panoramicImage', maxCount: 1},
    {name: 'images', maxCount: 3}
]), authenticate, createSingleUmkm);
router.get('/all', authenticate, getAllUmkm);

export default router;


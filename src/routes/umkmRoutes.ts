import {Router} from 'express';
import {createSingleUmkm, getAllUmkm, deleteSingleUmkm, updateSingleUmkm, getSingleUmkm} from "../controllers/umkmController";
import authenticate from '../middlewares/authenticate';
import multer from "multer";

const router = Router();
const upload = multer({storage: multer.memoryStorage()});

router.post('/', upload.fields([
    {name: 'panoramicImage', maxCount: 1},
    {name: 'images', maxCount: 3},
    {name: 'profileImage', maxCount: 1},
    {name: 'productImage', maxCount: 1},
]), authenticate, createSingleUmkm);
router.get('/all', authenticate, getAllUmkm);
router.get('/:id', authenticate, getSingleUmkm);
router.put('/:id', upload.fields([
    {name: 'panoramicImage', maxCount: 1},
    {name: 'images', maxCount: 3},
    {name: 'profileImage', maxCount: 1},
    {name: 'productImage', maxCount: 1},
]), authenticate, updateSingleUmkm);
router.delete('/:id', authenticate, deleteSingleUmkm);

export default router;


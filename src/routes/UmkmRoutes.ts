import {Router} from 'express';
import {createSingleUmkm, getAllUmkm, deleteSingleUmkm, updateSingleUmkm, getSingleUmkm, validateUmkm, viewCountIncrement} from "../controllers/umkmController";
import authenticate from '../middlewares/authenticate';
import multer from "multer";
import authorize from "../middlewares/authorize";

const router = Router();
const upload = multer({storage: multer.memoryStorage()});

router.post('/', upload.fields([
    {name: 'panoramicImage', maxCount: 1},
    {name: 'images', maxCount: 3},
    {name: 'profileImage', maxCount: 1},
]), authenticate, createSingleUmkm);
router.get('/all', getAllUmkm);
router.get('/:id', getSingleUmkm);
router.put('/:id', upload.fields([
    {name: 'panoramicImage', maxCount: 1},
    {name: 'images', maxCount: 3},
    {name: 'profileImage', maxCount: 1},
]), authenticate, updateSingleUmkm);
router.delete('/:id', authenticate, deleteSingleUmkm);
router.post('/:id/validate', authenticate, authorize('admin'), validateUmkm);
router.post('/:id/view', viewCountIncrement);

export default router;


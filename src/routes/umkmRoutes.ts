import {Router} from 'express';
import {createSingleUmkm, getAllUmkm} from "../controllers/umkmController";
import authenticate from '../middlewares/authenticate';

const router = Router();

router.post('/', authenticate, createSingleUmkm);
router.get('/all', authenticate, getAllUmkm);

export default router;


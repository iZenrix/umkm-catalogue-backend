import {Router} from 'express';
import {
    createSingleType,
    getAllTypes,
    getSingleType,
    updateSingleType,
    deleteSingleType,
    getTypesByCategoryFunc
} from '../controllers/typeController';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();

router.get('/all', authenticate, getAllTypes);
router.get('/:id', authenticate, getSingleType);
router.post('/', authenticate, createSingleType);
router.put('/:id', authenticate, updateSingleType);
router.delete('/:id', authenticate, deleteSingleType);
router.get('/category/:id', authenticate, getTypesByCategoryFunc);

export default router;
import {Router} from 'express';
import {
    createSingleCategory,
    getAllCategories,
    getSingleCategory,
    updateSingleCategory,
    deleteSingleCategory
} from '../controllers/categoryController';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();

router.get('/all', authenticate, getAllCategories);
router.get('/:id', authenticate, getSingleCategory);
router.post('/', authenticate, createSingleCategory);
router.put('/:id', authenticate, updateSingleCategory);
router.delete('/:id', authenticate, deleteSingleCategory);

export default router;
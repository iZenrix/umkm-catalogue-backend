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

router.get('/all', getAllCategories);
router.get('/:id', getSingleCategory);
router.post('/', authenticate, authorize('admin'), createSingleCategory);
router.put('/:id', authenticate, authorize('admin'), updateSingleCategory);
router.delete('/:id', authenticate, authorize('admin'), deleteSingleCategory);

export default router;
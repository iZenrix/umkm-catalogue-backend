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
router.post('/', authenticate, authorize('admin'), createSingleType);
router.put('/:id', authenticate, authorize('admin'), updateSingleType);
router.delete('/:id', authenticate, authorize('admin'), deleteSingleType);
router.get('/category/:id', authenticate, authorize('admin'), getTypesByCategoryFunc);

export default router;
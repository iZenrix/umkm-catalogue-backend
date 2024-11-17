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

router.get('/all', getAllTypes);
router.get('/:id', getSingleType);
router.post('/', authenticate, authorize('admin'), createSingleType);
router.put('/:id', authenticate, authorize('admin'), updateSingleType);
router.delete('/:id', authenticate, authorize('admin'), deleteSingleType);
router.get('/category/:id', getTypesByCategoryFunc);

export default router;
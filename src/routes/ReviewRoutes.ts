import {Router} from 'express';
import {
    createSingleReview,
    getSingleReview,
    updateSingleReview,
    deleteSingleReview,
    getReviewsByUMKMId,
    getReviewsByUserId
} from '../controllers/reviewController';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.get('/umkm/:id', getReviewsByUMKMId);
router.get('/user/:id', getReviewsByUserId);
router.get('/:id', getSingleReview);
router.post('/', authenticate, createSingleReview);
router.put('/:id', authenticate, updateSingleReview);
router.delete('/:id', authenticate, deleteSingleReview);

export default router;
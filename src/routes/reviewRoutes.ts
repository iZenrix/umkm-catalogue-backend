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
import authorize from '../middlewares/authorize';

const router = Router();

router.get('/umkm/:id', authenticate, getReviewsByUMKMId);
router.get('/user/:id', authenticate, getReviewsByUserId);
router.get('/:id', authenticate, getSingleReview);
router.post('/', authenticate, createSingleReview);
router.put('/:id', authenticate, updateSingleReview);
router.delete('/:id', authenticate, deleteSingleReview);

export default router;
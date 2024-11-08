import {Router} from 'express';
import {getProfile} from '../controllers/userController';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();

router.get('/profile', authenticate, getProfile);
router.get('/admin', authenticate, authorize('admin'), (req, res) => {
    res.send('halo');
});

export default router;
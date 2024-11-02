import {Router} from 'express';
import {getProfile, login, register} from '../controllers/userController';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();

router.post('/login', login);
router.post('/register', register);

router.get('/profile', authenticate, getProfile);

router.get('/admin', authenticate, authorize('admin'), (req, res) => {
    res.send('halo');
});

export default router;
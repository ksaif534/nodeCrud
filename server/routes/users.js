import { signin, signup, getProfile, editProfile, updateProfile } from '../controllers/user.js';
import express from 'express';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/profile/:id', getProfile);
router.get('/profile/:id/edit',editProfile);
router.patch('/profile/:id/update',updateProfile);

export default router;
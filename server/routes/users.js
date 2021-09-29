import { signin, signup } from '../controllers/user.js';
import express from 'express';
// import Router from 'express-promise-router';

// const router = new Router();
const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

export default router;
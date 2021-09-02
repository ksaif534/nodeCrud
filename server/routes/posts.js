import { getPosts, createPost } from '../controllers/posts.js';
import express from 'express';
// import Router from 'express-promise-router';

// const router = new Router();
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);

export default router;
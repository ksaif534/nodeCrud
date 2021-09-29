import { getPosts, createPost, updatePost, deletePost,likePost } from '../controllers/posts.js';
import express from 'express';
// import Router from 'express-promise-router';

import auth from '../middleware/auth.js';

// const router = new Router();
const router = express.Router();

router.get('/', getPosts);
router.post('/', auth , createPost);
router.patch('/:id', auth , updatePost);
router.delete('/:id', auth , deletePost);
router.patch('/:id', auth , likePost);

export default router;
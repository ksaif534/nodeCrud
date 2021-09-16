import { getPosts, createPost, updatePost, deletePost,likePost } from '../controllers/posts.js';
import express from 'express';
// import Router from 'express-promise-router';

// const router = new Router();
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id', likePost);

export default router;
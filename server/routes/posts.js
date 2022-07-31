import { getPosts, getPost, getPostsBySearch, createPost, updatePost, deletePost,likePost, commentPost, updateComment, deleteComment } from '../controllers/posts.js';
import express from 'express';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/search',getPostsBySearch);
router.get('/:id',getPost);
router.post('/', auth , createPost);
router.patch('/:id', auth , updatePost);
router.delete('/:id/deletePost', auth , deletePost);
router.patch('/:id/likePost', auth , likePost);
router.post('/:id/commentPost', auth , commentPost);
router.patch('/:id/updateComment', auth , updateComment);
router.patch('/:id/deleteComment', auth , deleteComment);

export default router;
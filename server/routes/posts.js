import { getPosts, createPost } from '../controllers/posts.js';
import express from 'express';

const router = express.Router();

try{
    router.get('/', getPosts);
    router.post('/', createPost);
}catch (e) {
    console.log(e);
}

export default router;
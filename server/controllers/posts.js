import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts =  async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 2;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT) });
    } catch (error) {
        res.status(204).json({message: error.message});
    }
}

export const getPost = async (req, res) => {
    try {
        const { id:_id } = req.params;
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const post = await PostMessage.findById(_id);
            res.status(200).json(post);    
        }else{
            res.status(400).json({message: `Invalid id:${_id}`});
        }
    } catch (error) {
        res.status(203).json({message: error.message});
    }
}

export const getPostsBySearch = async (req, res) => {
    try {
        const { searchQuery,tags } = req.query;
        const title = new RegExp(searchQuery, 'i');
        const searchPosts = await PostMessage.find({$or: [{ title }, { tags: {$in: tags.split(',') }}]});
        res.status(200).json(searchPosts);
    } catch (error) {
        res.status(205).json({message: error.message});
    }
}

export const createPost = async (req, res) => {
    try {
        const post = req.body;
        const newPost = await PostMessage.create({ ...post, creator: req.userId, createdAt: new Date().toISOString()});
        res.status(200).json(newPost);
    } catch (error) {
        res.status(405).json();
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const post  = req.body;
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const updatedPost = await PostMessage.findByIdAndUpdate(_id,{ ...post, _id }, { new: true });
            res.json(updatedPost);
        }else{
            return res.status(404).send(`No Post with that ID`);
        }    
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).send(`No Post with that ID`);
        }else{
            await PostMessage.findByIdAndRemove(_id);
            res.json({message: `Post Deleted Succesfuly`});
        }
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!req.userId) {
            return res.json({message: 'UnAuthenticated'});
        }
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send(`No Post with that ID`);
        } else {
            const post = await PostMessage.findById(_id);
            const index = post.likes.findIndex((id) => {
                return (id === String(req.userId));
            });
            if (index === -1) {
                //Like the Post
                post.likes.push(req.userId);
            }else{
                //Dislike a Post
                post.likes = post.likes.filter((id) => {
                    return id !== String(req.userId);
                });
            }
            const updatedPost = await PostMessage.findByIdAndUpdate(_id,{ ...post, likeCount: post.likeCount + 1 },{ new: true });
            res.json(updatedPost);   
        }
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const { value } = req.body;
        const post = await PostMessage.findById(_id);
        post.comments.push(value);
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
        return res.json(updatedPost); 
    } catch (error) {
        
    }
}
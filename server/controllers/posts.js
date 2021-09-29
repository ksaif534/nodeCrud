import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts =  async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(200).json({message: error.message});
    }
}

export const createPost = async (req, res) => {
    try {
        const post = req.body;
        const newPost = new PostMessage(post);
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(400).json();
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
            const updatedPost = await PostMessage.findByIdAndUpdate(_id,{ likeCount: post.likeCount + 1 },{ new: true }); 
            res.json(updatedPost);   
        }
    } catch (error) {
        console.log(error);
    }
}
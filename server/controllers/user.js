import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import mongoose from 'mongoose';

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(!existingUser){
            return res.status(404).json({message: 'User Doesnt exist'});
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: 'Invalid Credentials'});
        }
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', { expiresIn: "24h" });
        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

export const signup = async (req, res) => {
    const { email, password, profilepic , userdetails , confirmPassword, firstName, lastName } = req.body;
    try {
        const existingUser = await User.findOne({ email, password, profilepic , userdetails , confirmPassword, firstName, lastName });
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords dont match' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, profilepic, userdetails, name: `${firstName} ${lastName}`});
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', {expiresIn:'24h'});
        res.status(200).json({ result, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
    }
}

export const editProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const user = req.body;
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const updatedUser = await User.findByIdAndUpdate(_id, { ...user, _id }, { new: true });
            res.json(updatedUser);
        }else{
            res.status(404).send(`No User with that ID`);
        }
    } catch (error) {
        console.log(error);
    }
}
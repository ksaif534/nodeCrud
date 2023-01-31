import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true},
    id: { type: String },
    profilepic: { type: Object, required: true },
    userdetails: { type: String, required: true }
});

const User = mongoose.model('User',userSchema);
export default User;
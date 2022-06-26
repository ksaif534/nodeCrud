import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(express.json({limit: '300mb'}));
app.use(cors());
app.use(morgan('common'));

app.use('/posts',postRoutes);
app.use('/users',userRoutes);

// const PORT = process.env.PORT || 5000;

// const LOCAL_CONNECTION = 'mongodb://localhost:27017/admin';
mongoose.connect(process.env.LOCAL_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => morgan('common'))
    .catch((error) => console.log(error.message));
// mongoose.set('useFindAndModify',false);

app.listen(process.env.PORT, () => console.log(`Server Running on Port: ${process.env.PORT}`))
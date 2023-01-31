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

mongoose.connect(process.env.LOCAL_CONNECTION)
    .then(() => morgan('common'))
    .catch((error) => console.log(error.message));

app.listen(process.env.PORT, () => console.log(`Server Running on Port: ${process.env.PORT}`))
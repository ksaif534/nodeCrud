import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use(express.json({limit: '300mb'}));
app.use(cors());

app.use('/posts',postRoutes);

const PORT = process.env.PORT || 5000;

const CONNECTION_URL = 'mongodb+srv://sk123:ksaif123%21%40%23@cluster0.bsvyr.mongodb.net/testDB?retryWrites=true&w=majority';
const LOCAL_CONNECTION = 'mongodb://localhost:27017/admin';
mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch((error) => console.log(error.message));
mongoose.set('useFindAndModify',false);

app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
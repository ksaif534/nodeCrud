import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({limit: "30mb",extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors);

app.use('/posts',postRoutes);

const CONNECTION_URL = 'mongodb+srv://sk123:ksaif123%21%40%23@cluster0.bsvyr.mongodb.net/testDB?retryWrites=true&w=majority';
const LOCAL_CONNECTION = 'mongodb://localhost:27017/admin';
const PORT = process.env.PORT || 5000;
mongoose.connect(LOCAL_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
    .catch((error) => console.log(error.message));
mongoose.set('useFindAndModify',false);
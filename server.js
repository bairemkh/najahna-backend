import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config()

import userRoutes from './routes/userRoute.js';


const app = express();
const port = process.env.PORT || 9090;

const databaseName = 'Najahni-db';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));



app.use('/user',userRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
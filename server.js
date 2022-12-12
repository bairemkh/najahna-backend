import express, { json } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Server } from "socket.io";

dotenv.config()

import userRoutes from './routes/userRoute.js';
import courseRoutes from './routes/courseRoute.js'
import sectionRoutes from './routes/sectionRoute.js'
import lessonRoutes from './routes/lessonRoute.js'
import commentRoutes from './routes/commentRoute.js'
import messageRoutes from './routes/messageRoute.js'
import {createMessageSocket} from './controllers/messageController.js'
import swaggerUi from 'swagger-ui-express';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger.json')  





const app = express();
const port = process.env.PORT || 9090;

const databaseName = 'Najahni-db';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/img",express.static('public/images'));
app.use("/vid",express.static('public/videos'));
app.use("/file",express.static('public/files'));

app.use('/user',userRoutes);
app.use('/course',courseRoutes)
app.use('/section',sectionRoutes)
app.use('/lesson',lessonRoutes)
app.use('/comment',commentRoutes)
app.use('/message',messageRoutes)
app.get('/', function(req,res) {
  res.send("welcome to najahni")
});

const io = new Server()

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.on("onMessage", (msg) => {
    // an event was received from the client
    socket.emit('onMessage',createMessageSocket(msg))
  });

  // upon disconnection
  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });
});

io.listen(3000,()=>{
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    console.log("hello");
  });
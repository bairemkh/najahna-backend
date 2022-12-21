import express, { json } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { createServer } from "http";
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
import enrollRoutes from './routes/enrollcourseRoute.js'
import {createMessageSocket} from './controllers/messageController.js'
import {createNotificationSocket} from './controllers/NotificationsController.js'
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
app.use('/enroll',enrollRoutes)
app.get('/', function(req,res) {
  res.send("welcome to najahni")
});

const httpServer = createServer(app);
const io = new Server(httpServer)

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  

  socket.on("onMessage", (msg) => {
    // an event was received from the client
    console.log(msg);
    socket.emit(msg.receiverid,{msg})
    socket.broadcast.emit(msg.receiverid,createMessageSocket(msg))
  });
  socket.on("notification", (notif) => {
    // an event was received from the client
    console.log(notif);
    socket.emit("receive",notif)
    socket.broadcast.emit("receive",createNotificationSocket(notif))
  });
  // upon disconnection
  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });
});


httpServer.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
import { Server } from 'socket.io';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import http from 'http';
import cors from 'cors';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname+"/public")))

const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin:["http://localhost:3000",'https://futurechatapp-34e9.onrender.com','https://futurechatapp-3yiy.onrender.com','https://futurechatapp1.onrender.com'],
    methods:["GET","POST"]
  }
});

io.on('connection',socket =>{
  console.log(`user connected: ${socket.id}`);

  socket.on('join_room',(userdetails)=>{
    socket.join(userdetails.room);
    socket.to(userdetails.room).emit('receive_announcement',userdetails.username);
  })

  socket.on('send_message',message =>{
    console.log(message)
    socket.to(message.room).emit('receive_message',message);  
  });

  socket.on('disconnect',()=>{
    console.log("user-disconnected");
  })
})

server.listen(3001,()=>{
  console.log("server is running");
})

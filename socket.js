import { Server } from "socket.io";
import http from "http";
import express from "express"
import jwt from "jsonwebtoken";
import { Socket } from "dgram";


const app = express();
const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin:["http://localhost:5173", "http://localhost:5174"],
        methods:["GET", "POST"],
    },
});

app.use((req, res, next)=> {
    req.io = io;
    next();
});

const userSocketMap = {};

export const getReceiverSocketId = (receieverId) => {
    return userSocketMap[receieverId]
}


io.on("connection", (socket) => {
    console.log("A user is connected", socket.id);
    socket.emit("getOnlineUsers", socket.id);

    socket.on('disconnect', () => {
        console.log("user disconnected: ", socket.id);


        socket.emit("call ended")
    });

    socket.on('newMessage', async(data) => {
        const newMessage = new CharacterData({
            sender:data.sender,
            message:data.message,
            fileUrl: data.fileUrl || '',
        });
        await newMessage.dispatchEvent();
        io.emit('message', newMessage);
    })
})

export {app, server, io};
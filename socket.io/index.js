const mongoose = require('mongoose');
const dotenv = require('dotenv');
const OnlineUser = require('./Models/OnlineUser/OnlineUser');
const onlineUserController = require('./Controllers/OnlineUser/OnlineUser');

// mongoose.set('useFindAndModify', false);

dotenv.config();
//connect mongoDB
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
);

const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on('connection', async (socket) => {
    socket.on("addUser", async (userId) => {
        await onlineUserController.addUser(userId, socket.id)
        io.emit("getUsers", await onlineUserController.getUsers())
    })
    socket.on("disconnect", async () => {
        await onlineUserController.deleteUsers(socket.id)
        io.emit("getUsers", await onlineUserController.getUsers())
    })
    socket.on("sendMessage", async (message) => {
        const receiverUser = await onlineUserController.getUser(message.receiverId);
        console.log(receiverUser.socketId)
        io.to(receiverUser.socketId).emit("getMessage", message)
    })
})

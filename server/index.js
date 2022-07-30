const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const chatRouter = require("./routes/chatRoutes");
const videoRouter = require("./routes/videoRoutes");
const teacher = require("./routes/teacher");
const server = require("http").createServer(app);
const { Server } = require("socket.io");
var messages = [];
var users=[]
//<---------------------------------------------------------------->//Chat App
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  
  socket.on("close_chat", (time) => {
    socket.broadcast.emit("chatClosed",time)
    socket.broadcast.emit("videoClosed")
  })
  //<---------------------------------------------------------------->//chat
  socket.on("startChat", (data) => {
    socket.broadcast.emit("chatNotification", data);
  });
  socket.on("letsChat", () => {
    socket.broadcast.emit("chatStarted");
  });
  socket.on("send_message", (data) => {
    messages.push(data);
    socket.broadcast.emit("receive_message", messages);
  });
  //<---------------------------------------------------------------->//video
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
  //------------------------------------------for video
  socket.emit("yourID", socket.id);
  io.sockets.emit("allUsers", users);
  


  socket.on("callUser", (data) => {
    socket.broadcast.emit("callUser", data);
  });
  socket.on("acceptCall", (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  })
  socket.on("answerCall", (data) => {
    users[0] = (data.TeacherID)
    users[1] = (data.StudentID)
    socket.broadcast.emit("callaccepted");
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//<---------------------------------------------------------------->
//Add routes here
app.use("/auth", authRouter);
app.use("/payment", paymentRouter);
app.use("/chat", chatRouter);
app.use("/video", videoRouter);
app.use("/", teacher);
//<---------------------------------------------------------------->

const CONNECTION_URL =
  "mongodb+srv://kimayeClone2022:XOBvv9RKjbaIupfO@cluster0.bhsaorg.mongodb.net/kimaye?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8000;
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    server.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const chatRouter = require("./routes/chatRoutes");
const teacher = require("./routes/teacher")
const server = require('http').createServer(app);
const { Server } = require('socket.io')
var messages = []
//<---------------------------------------------------------------->//Chat App
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("startChat", (data) => {
    socket.broadcast.emit("chatNotification", data);
  });
  socket.on("letsChat", () => {
    socket.broadcast.emit("chatStarted");
  });
  socket.on("send_message", (data) => {
    messages.push(data)
    socket.broadcast.emit("receive_message", messages);
  });
  socket.emit("receive_message", messages);
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
//<---------------------------------------------------------------->

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//<---------------------------------------------------------------->
//Add routes here
app.use("/auth", authRouter);
app.use("/razorpay", paymentRouter);
app.use("/chat", chatRouter);
app.use("/",teacher)
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

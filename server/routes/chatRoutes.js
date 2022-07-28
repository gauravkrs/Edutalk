const { Router } = require("express");
const chatRouter = Router();
const {chatController} = require("../controllers/chatController")
chatRouter.post("/:id",chatController)

module.exports = chatRouter
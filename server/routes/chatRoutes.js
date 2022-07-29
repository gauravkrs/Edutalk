const { Router } = require("express");
const chatRouter = Router();
const {chatController,chatGet} = require("../controllers/chatController")
chatRouter.post("/:id",chatController)
chatRouter.get("/:id",chatGet)
module.exports = chatRouter
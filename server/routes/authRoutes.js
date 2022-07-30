const { Router } = require('express')
const authRouter = Router()

const { register, chat, user, userByPhone, userPut } = require("../controllers/userController")

authRouter.post("/register", register)
authRouter.post("/chat", chat)
authRouter.get("/:id", user)
authRouter.put("/:id", userPut)
authRouter.get("/phone/:id", userByPhone)
module.exports= authRouter
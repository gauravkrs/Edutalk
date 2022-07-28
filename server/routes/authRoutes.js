const { Router } = require('express')
const authRouter = Router()

const register = require("../controllers/userController")

authRouter.post("/register", register)

module.exports= authRouter
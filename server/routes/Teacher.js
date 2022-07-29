const { Router } = require('express')
const teacherDatas = Router()
const {teacher} = require("../controllers/userController")

teacherDatas.get("/",teacher)
module.exports= teacherDatas
const { Router } = require('express')
const teacher = Router();

teacher.get("/",async(req,res)=>{
    try {
        const teacherdata = await users.find();
        res.status(201).json(teacherdata)
        console.log(teacherdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports= teacher;
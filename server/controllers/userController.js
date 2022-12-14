const teacherModel = require("../models/teacherModel")
const studentModel = require("../models/studentModel")
//<------------------------------------------------------------------------------------------------>
const register = async (req, res) => {
    if (req.body.type == "student") {
        const search = await studentModel.find({ Phone: req.body.Phone })   
        //<-------------------------------------------------------------------->// When Student
        if (search.length) {
            res.send({ Message: "Account already registered", data: search[0] })
        } else {
            const data = new studentModel(req.body)
            data.save((err, success) => {
                if (err) res.send(err)
                else {
                    res.send(success)
                }
            })
        }
    } else {
        const search = await teacherModel.find({ Phone: req.body.Phone })
        //<-------------------------------------------------------------------->// When Teacher
        if (search.length) {
            res.send({ Message: "Account already registered", data: search[0] })
        } else {
            const data = new teacherModel(req.body)
            data.save((err, success) => {
                if (err) res.send(err)
                else {
                    res.send(success)
                }
            })
        }
    } 
}
//<------------------------------------------------------------------------------------------------>
const chat = async (req, res) => { 
    const teacherID = req.body.teacher
    const studentID = req.body.student
    teacherModel.find({ ID: teacherID }).then(resTeacher => {
        studentModel.find({ ID: studentID }).then(resStudent => {
            const users = {
                student: resStudent,
                teacher: resTeacher
            }
            res.send(users)
        })
    })
}
//<------------------------------------------------------------------------------------------------>
const user = async (req, res) => {
    const search = await teacherModel.find({ ID: req.params.id })
    if (search.length == 0) {
        const search = await studentModel.find({ ID: req.params.id })
        res.send(search[0])
    } else {
        res.send(search[0])
    }
}
//<------------------------------------------------------------------------------------------------>
const userByPhone = async (req, res) => {
    const search1 = await teacherModel.find({ Phone: req.params.id })
    if (search1.length == 0) {
        const search2 = await studentModel.find({ Phone: req.params.id })
        if (search2.length == 0) {
            res.send({Message: 'Not registered'})
        } else {
            res.send(search2[0])
        }
    } else {
        res.send(search1[0])
    }
}

const teacher= async (req,res)=>{
    try {
        const teacherdata = await teacherModel.find();
        res.status(201).json(teacherdata)
        console.log(teacherdata);
    } catch (error) {
        res.status(422).json(error);
    }
}
//<------------------------------------------------------------------------------------------------>
const userPut = async (req, res) => {
    const type = req.body.type
    if (type == "inc") {
        var amount = req.body.amount
        amount = +amount
        const data = await studentModel.findOneAndUpdate({ ID: req.params.id }, { $inc: { "Wallet": amount } })
        res.send(data)
    } else {
        const time = +req.body.amount
        const ID = req.body.TeacherID
        const teacher = await teacherModel.findOne({ ID: ID })
        console.log(teacher)
        const charge = +teacher.Charge
        const amount = time*charge
        const data = await studentModel.findOneAndUpdate({ ID: req.params.id }, { $inc: { "Wallet": -amount } })
        res.send(data)
    }
}
//<------------------------------------------------------------------------------------------------>
module.exports = { register, chat, user, userByPhone, teacher, userPut }
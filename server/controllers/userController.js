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
            const data = new UserModel(req.body)
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
            const data = new UserModel(req.body)
            data.save((err, success) => {
                if (err) res.send(err)
                else {
                    res.send(success)
                }
            })
        }
    }
    
    
}

module.exports= register
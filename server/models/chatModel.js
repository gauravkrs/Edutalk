const { Schema, model } = require('mongoose')
const chatSchema = new Schema({
    ChatID: String,
    StudentID: String,
    TeacherID: String,
    StudentName: String,
    TeacherName: String,
})

const chatModel = model("chat", chatSchema)
module.exports= chatModel
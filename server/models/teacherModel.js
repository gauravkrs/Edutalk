const { Schema, model } = require('mongoose')
const teacherSchema = new Schema({
    ID: String,
    Name: String,
    Email: String,
    Phone: String,
    Status: Boolean,
    onCall: Boolean,
    Charge: Number,
    Experiences: Number,
    About: String,
    Experties: String,
})
const teacherModel = model("teacher",teacherSchema)

module.exports = teacherModel
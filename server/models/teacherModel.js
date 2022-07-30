const { Schema, model } = require('mongoose')
const teacherSchema = new Schema({
    ID: String,
    Name: String,
    Email: String,
    Phone: String,
    Status: {type: Boolean, default: false},
    onCall: { type: Boolean, default: false },
    Charge: { type: Number, default: 10 },
    Experience: String,
    About: String,
    Expertise: { type: String },
})
const teacherModel = model("teacher",teacherSchema)

module.exports = teacherModel
const { Schema, model } = require('mongoose')
const studentSchema = new Schema({
    ID: String,
    Name: String,
    Email: String,
    Phone: Number,
    Wallet: Number,
    Academics: String,
})

const studentModel = model("student",studentSchema)

module.exports = studentModel
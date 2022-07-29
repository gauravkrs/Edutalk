const chatModel = require('../models/chatModel')

const chatController = async (req, res) => {
    const chat = req.body 
    const search = await chatModel.find({ StudentID: chat.StudentID, TeacherID: chat.TeacherID })
    if (search.length > 0) {
        res.send(search[0])
    } else {
        const data = new chatModel(chat)
        data.save((err, success) => {
            if (err) res.send(err)
            else res.send(success)
        })
    }
}
module.exports = { chatController }
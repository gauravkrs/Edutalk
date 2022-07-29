import React from 'react'
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import {v4} from "uuid"
function About() {
    const navigate = useNavigate()
    const params = useParams()
    const handleChat = () => {
        const studentID  = JSON.parse(localStorage.getItem("user"))
        const userID = {
            teacher: params.id,
            student: studentID
        }
        axios.post("http://localhost:8000/auth/chat", userID).then((response) => {
            const chatID = v4()
            const user = {
                ChatID: chatID,
                StudentID: response.data.student[0].ID,
                TeacherID: response.data.teacher[0].ID,
                StudentName: response.data.student[0].Name,
                TeacherName: response.data.teacher[0].Name
            }
            axios.post(`http://localhost:8000/chat/${chatID}`, user).then((res) => {
                console.log(res)
                 navigate(`/chat/${res.data.ChatID}`);
             })
        })
    }
  return (
    <div>
      <button onClick={() => handleChat()}>Chat</button>
      <br />
      <button onClick={() => navigate("/call")}>Video Call</button>
    </div>
  );
}

export default About
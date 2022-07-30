import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@chakra-ui/progress";
import axios from "axios";
import { v4 } from "uuid";
import io from "socket.io-client";
const socket = io.connect("https://edutechb.herokuapp.com");

function About() {
  var url = useRef();
  const [user, setUser] = useState("");
  const [chatloading, setChatLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const handleChat = () => {
    const studentID = JSON.parse(localStorage.getItem("user"));
    const userID = {
      teacher: params.id,
      student: studentID,
    };
    axios.post("https://edutechb.herokuapp.com/auth/chat", userID).then((response) => {
      const chatID = v4();
      const user = {
        ChatID: chatID,
        StudentID: response.data.student[0].ID,
        TeacherID: response.data.teacher[0].ID,
        StudentName: response.data.student[0].Name,
        TeacherName: response.data.teacher[0].Name,
      };

      axios
        .post(`https://edutechb.herokuapp.com/chat/${chatID}`, user)
        .then(async (res) => {
          url.current = res.data.ChatID;
          localStorage.setItem("TeacherID", JSON.stringify(res.data.TeacherID))
          await socket.emit("startChat", res);
          setChatLoading(true);
        });
    });
  };
  //<--------------------------------------videocall
  const handleCall = () => {
    const studentID = JSON.parse(localStorage.getItem("user"));
    const userID = {
      teacher: params.id,
      student: studentID,
    };
    axios.post("https://edutechb.herokuapp.com/auth/chat", userID).then((response) => {
      console.log(response);
      const chatID = v4();
      const user = {
        ChatID: chatID,
        StudentID: response.data.student[0].ID,
        TeacherID: response.data.teacher[0].ID,
        StudentName: response.data.student[0].Name,
        TeacherName: response.data.teacher[0].Name,
      };

      axios
        .post(`https://edutechb.herokuapp.com/video/${chatID}`, user)
        .then(async (res) => {
          url.current = res.data.ChatID;
          await socket.emit("callUser", res);
          setVideoLoading(true);
        });
    });
  };
  useEffect(() => {
    socket.on("chatStarted", () => {
      setChatLoading(false);
      navigate(`/chat/${url.current}`);
    });
    socket.on("callaccepted", () => {
      setVideoLoading(false);
      navigate(`/call/${url.current}`);
    });
  }, [socket]);
  const div = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    margin: "20px auto",
    borderBottom: "1px solid gray",
  };
  const button = {
    width: "20%",
    color: "white",
    background: "royalblue",
    borderRadius: "15px",
    padding: "5px",
  };
  useEffect(() => {
    const type = JSON.parse(localStorage.getItem("designation")) || "";
    if (type == "teacher") navigate("/account");
    else if(type=="") navigate("/auth")
    const id = params.id;
    axios.get(`https://edutechb.herokuapp.com/auth/${id}`).then((response) => {
      setUser(response.data);
    });
  }, []);
  return user == "" ? (
    <div style={{ width: "10%", margin: "100px auto", textAlign: "center" }}>
      <CircularProgress isIndeterminate color="#66a3bb" />
    </div>
  ) : (
    <div>
      <div
        style={{
          width: "70%",
          padding: "20px",
          margin: "20px auto",
          textAlign: "center",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
      >
        <h1 style={{ color: "royalblue", fontSize: "30px", padding: "30px" }}>
          {user.Name}
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "75%",
            margin: "auto",
          }}
        >
          <div>
            <img
              style={{ borderRadius: "50%", width: "50%" }}
              src="https://c.neh.tw/thumb/f/720/comvecteezy420553.jpg"
              alt="profile-pic"
            />
          </div>
          <div style={{ width: "50%" }}>
            <div style={div}>
              <p style={{ color: "royalblue" }}>Charge per Min :</p>
              <p>{user.Charge}</p>
            </div>
            <div style={div}>
              <p style={{ color: "royalblue" }}>Experience :</p>
              <p>{user.Experience}</p>
            </div>
            <div style={div}>
              <p style={{ color: "royalblue" }}>Experties :</p>
              <p>{user.Expertise}</p>
            </div>
          </div>
        </div>
        <br />
        <div
          style={{
            width: "80%",
            color: "gray",
            margin: "auto",
            textAlign: "justify",
          }}
        >
          {user.About}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            margin: "20px",
          }}
        >
          {chatloading ? (
            <div>
              Waiting
              <CircularProgress isIndeterminate color="green.300" />
            </div>
          ) : (
            <button style={button} onClick={() => handleChat()}>
              Chat
            </button>
          )}
          {videoLoading ? (
            <div>
              Waiting
              <CircularProgress isIndeterminate color="green.300" />
            </div>
          ) : (
            <button style={button} onClick={() => handleCall()}>
              Video Call
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default About;

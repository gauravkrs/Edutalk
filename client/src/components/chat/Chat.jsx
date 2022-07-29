import React, { useEffect, useState, useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import io from "socket.io-client";
const socket = io.connect("http://localhost:8000");
//<---------------------------------------------------------------->
function Chat() {
  const navigate= useNavigate()
  const notify = (data) => toast(data);
  const messageRef= useRef(null)
  const params = useParams();
  const [Message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem("user")) || null
    if (userID==null) {
      navigate("/");
    }
    axios.get(`http://localhost:8000/auth/${userID}`).then((response) => {
      const chatID = params.id
      axios.get(`http://localhost:8000/chat/${chatID}`).then((res) => {
        if (res.data.Message == "No Such Chat Room") {
          navigate("/");
        }
        if (res.data.StudentID == userID || res.data.TeacherID == userID) {
          notify("Chat Started");
        } else {
          navigate("/")
        }
      });
      setUsername(response.data.Name);
    });
  }, []);
  const sendMessage = async () => {
    if (Message !== "") {
      const messageData = {
        room: params.id,
        sender: username,
        message: Message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList(data);
    });
  }, [socket]);
  useEffect(() => {
   messageRef.current.scrollIntoView();
  }, [messageList])
  const handleChatEnd = () => {
    navigate("/account")
  }
  const left = {
    background: "green",
    color: "white",
    margin: "10px",
    borderRadius: "5px",
    padding: "10px",
    textAlign: "justify",
    minWidth: "100px",
    maxWidth: "500px",
    display: "inline-block",
  };
  const right = {
    background: "royalblue",
    color: "white",
    margin: "10px",
    borderRadius: "5px",
    padding: "10px",
    textAlign: "justify",
    minWidth: "100px",
    maxWidth:"500px",
    display: "inline-block",
  };
  const leftDiv = {
    color: "white",
    fontSize: "14px",
    display: "flex",
    justifyContent: "flex-start",
  };
  const rightDiv = {
    color: "white",
    fontSize: "14px",
    display: "flex",
    justifyContent: "flex-end",
  };
  return (
    <div
      style={{
        background: "white",
        width: "60%",
        height: "500px",
        margin: "80px auto",
        boxShadow:
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
        textAlign: "center",
      }}
    >
      <ToastContainer />
      <div>
        <div
          style={{
            color: "royalblue",
            fontSize: "22px",
            padding: "5px",
            background: "#f0f0f0",
          }}
        >
          EduTalk Chat
        </div>
      </div>
      <div
        style={{
          width: "90%",
          height: "400px",
          margin: "auto",
          overflow: "scroll",
          display: "block",
        }}
      >
        <div>
          <ScrollToBottom
            style={{
              width: "100%",
              height: "100%",
              overflowY: "scroll",
              overflowX: "hidden",
              display: "flex",
            }}
          >
            {messageList.map((elem) => {
              return (
                <div
                  style={
                    elem.sender == username
                      ? { textAlign: "right" }
                      : { textAlign: "left" }
                  }
                  key={v4()}
                >
                  <div style={elem.sender == username ? right : left}>
                    <div>
                      <div>
                        <p>{elem.message}</p>
                      </div>
                      <div style={elem.sender == username ? rightDiv : leftDiv}>
                        <p style={{ marginRight: "10px" }} id="time">
                          {elem.time}
                        </p>
                        <p id="sender">{elem.sender}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
          <div ref={messageRef}></div>
        </div>
      </div>
      <div>
        <input
          style={{
            background: "whitesmoke",
            color: "gray",
            width: "80%",
            height: "50px",
            padding: "10px 20px",
            borderRadius: "20px",
            outline: "none",
            borderBottom: "3px solid royalblue",
            borderLeft: "3px solid green",
          }}
          type="text"
          value={Message}
          placeholder="Hey..."
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button style={{ color: "gray" }} onClick={() => sendMessage()}>
          &#9658;
        </button>
      </div>
      <br />
      <button
        onClick={()=>handleChatEnd()}
        style={{
          width: "50%",
          color: "white",
          background: "black",
          padding: "5px",
        }}
      >
        End Chat
      </button>
    </div>
  );
}

export default Chat;

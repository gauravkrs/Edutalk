import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { v4 } from "uuid";

import io from "socket.io-client";
const socket = io.connect("http://localhost:8000");
//<---------------------------------------------------------------->
function Chat() {
  const params = useParams();
  const [Message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem("user"));
    axios.get(`http://localhost:8000/auth/${userID}`).then((response) => {
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
    console.log(true);
    socket.on("receive_message", (data) => {
      setMessageList(data);
    });
  }, [socket]);

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
      <div>
        <div
          style={{
            color: "royalblue",
            fontSize: "22px",
            padding: "5px",
            background: "#f0f0f0",
          }}
        >
          Live Chat
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
        </div>
      </div>
      <div>
        <input
          style={{
            width: "80%",
            height: "50px",
            padding: "10px 0px",
            outline: "none",
            borderBottom: "1px solid gray",
          }}
          type="text"
          value={Message}
          placeholder="Hey..."
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={() => sendMessage()}>&#9658;</button>
      </div>
    </div>
    
  );
}

export default Chat;

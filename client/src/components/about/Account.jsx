import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@chakra-ui/progress";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8000");

function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [type1, setType] = useState(true);
  const [notification, setNotification] = useState(false);
  const [videoNotificatioin, setVideoNotification] = useState(false);
  const [caller, setCaller] = useState("");
  const div = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    margin: "20px auto",
    borderBottom: "1px solid gray",
  };
  const button = {
    width: "50%",
    color: "white",
    background: "black",
    padding: "5px",
  };
  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user"));
    axios.get(`http://localhost:8000/auth/${id}`).then((response) => {
      setUser(response.data);
      if (response.data.Charge) {
        setType(false);
      }
    });
  }, []);
  useEffect(() => {
    socket.on("callUser", (data) => {
      setVideoNotification(true);
      setCaller(data.data);
    });
    socket.on("chatNotification", (data) => {
      setNotification(true);
      setCaller(data.data);
    });
  }, [socket]);
  const handleNotification = async (type) => {
    if (type === "chat") {
      await socket.emit("letsChat");
      navigate(`/chat/${caller.ChatID}`);
    } else {
      await socket.emit("answerCall",caller);
      navigate(`/call/${caller.ChatID}`);
    }
  };
  return user == "" ? (
    <div style={{ width: "10%", margin: "100px auto", textAlign: "center" }}>
      <CircularProgress isIndeterminate color="#66a3bb" />
    </div>
  ) : !type1 ? (
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
      <h1 style={{ color: "royalblue", fontSize: "30px", padding: "10px" }}>
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
            style={{ borderRadius: "50%", width: "40%" }}
            src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
            alt="profile-pic"
          />
        </div>
        <div style={{ width: "60%" }}>
          <div style={div}>
            <p style={{ color: "royalblue" }}>Email :</p>
            <p>{user.Email}</p>
          </div>
          <div style={div}>
            <p style={{ color: "royalblue" }}>Phone :</p>
            <p>{user.Phone}</p>
          </div>
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
            <p>{user.Experties}</p>
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
      <br />
      <button onClick={() => handleLogout()} style={button}>
        Logout
      </button>
      {videoNotificatioin && (
        <button
          style={{
            color: "white",
            background: "green",
            width: "50%",
            margin: "auto",
            padding: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleNotification("call")}
        >{`${caller.StudentName} is calling`}</button>
      )}
      {notification && (
        <button
          style={{
            color: "white",
            background: "green",
            width: "50%",
            margin: "auto",
            padding: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleNotification("chat")}
        >{`${caller.StudentName} want to chat`}</button>
      )}
    </div>
  ) : (
    <div
      style={{
        color: "black",
        width: "70%",
        height: "400px",
        margin: "20px auto",
        textAlign: "center",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
      }}
    >
      <h1 style={{ color: "royalblue", fontSize: "30px", padding: "10px" }}>
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
            src="https://aux.iconspalace.com/uploads/12858963141256781998.png"
            alt="profile-pic"
          />
        </div>
        <div style={{ width: "60%" }}>
          <div style={div}>
            <p style={{ color: "royalblue" }}>Email :</p>
            <p>{user.Email}</p>
          </div>
          <div style={div}>
            <p style={{ color: "royalblue" }}>Phone :</p>
            <p>+{user.Phone}</p>
          </div>
          <div style={div}>
            <p style={{ color: "royalblue" }}>Wallet :</p>
            <p>{user.Wallet}</p>
          </div>
          <div style={div}>
            <p style={{ color: "royalblue" }}>Academics :</p>
            <p>{user.Academics}</p>
          </div>
        </div>
      </div>
      <br />
      <button onClick={() => handleLogout()} style={button}>
        Logout
      </button>
    </div>
  );
}

export default Account;

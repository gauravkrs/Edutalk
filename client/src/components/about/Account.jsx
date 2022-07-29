import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
function Account() {
  const navigate= useNavigate()
  const [user, setUser] = useState({});
  const [type1, setType] = useState(true);
  const div = {
    display: 'flex',
    alignItems: "center",
    justifyContent: "space-between",
    width: "40%",
    margin: "20px auto",
    borderBottom: "1px solid gray"
  }
  const button = {
    width: "50%",
    color: "white",
    background: "black",
    padding:"5px"
  }
  const handleLogout = async () => {
    await axios.put("/")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/auth")
  }
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user"));
    axios.get(`http://localhost:8000/auth/${id}`).then((response) => {
      setUser(response.data);
      if (response.data.Charge) {
        setType(false)
      }
    });
  }, []);
  return !type1 ? (
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
      <button onClick={()=>handleLogout()} style={button}>Logout</button>
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
    ></div>
  );
}

export default Account;

import React from 'react'
import {useNavigate} from "react-router-dom"
function PageNotFound() {
    const navigate= useNavigate()
  return (
    <div style={{ width: "40%", margin: "auto", textAlign: "center" }}>
      <img
        width="100%"
        src="https://blog.thomasnet.com/hs-fs/hubfs/shutterstock_774749455.jpg?width=600&name=shutterstock_774749455.jpg"
        alt="PageNotFound"
      />
      <button
        style={{
          color: "white",
          width: "80%",
          margin: "20px auto",
          padding: "5px 10px",
          background: "black",
        }}
        onClick={() => navigate("/")}
      >
        Home Page
      </button>
    </div>
  );
}

export default PageNotFound
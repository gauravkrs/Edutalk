import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/authentication/Login"
import HomePage from "./components/Home/Home";
function Main() {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Login/>}/>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default Main;

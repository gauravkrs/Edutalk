import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/authentication/Login"
import HomePage from "./components/Home/Home";
import { Payment } from "./components/Payment/Payment"
import Chat from "./components/chat/Chat"
import About from "./components/about/About"
import Call from "./components/chat/Call"
function Main() {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/call" element={<Call />} />
        <Route path="/about/:id" element={<About />} />
      </Routes>
    </div>
  );
}

export default Main;

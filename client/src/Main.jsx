import React from "react";
import { Routes, Route } from "react-router-dom";
// import Teacher from "./components/About/Teacher";
import Login from "./components/authentication/Login";
import HomePage from "./components/Home/Home";
import { Payment } from "./components/Payment/Payment";
import Chat from "./components/chat/Chat";
import About from "./components/about/About";
import Call from "./components/chat/Call";
import Account from "./components/about/Account";
import PageNotFound from "./PageNotFound";
function Main() {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/call/:id" element={<Call />} />
        <Route path="/about/:id" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Main;

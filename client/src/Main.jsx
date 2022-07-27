import React from 'react'
import { Routes, Route } from "react-router-dom"
import Login from "./components/authentication/Login"
function Main() {
  return (
      <div>
          <Routes>
              <Route path="/" element={<Login/>}/>
          </Routes> 
    </div>
  )
}

export default Main
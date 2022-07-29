import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import axios from "axios"
import Timer from "./Timer"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Otp({ setPage }) {
    const navigate= useNavigate()
  const [otp, setOtp] = useState(0)
  
  const notify = (data) => toast(data);

    const handleSubmit = (e) => {
        e.preventDefault();
        //<-----------------------------> //OTP Logic for verification
        const result = window.confirmation;
        result
            .confirm(otp)
            .then((result) => {
                console.log(result)
                axios
                  .get(`http://localhost:8000/auth/phone/${result.user.phoneNumber}`)
                    .then((response) => {
                      console.log(response)
                    if (response.data.Message == "Not registered") {
                      const userPreData = {
                        Token: result._tokenResponse.idToken,
                        Phone: result.user.phoneNumber,
                      };
                      localStorage.setItem(
                        "preUser",
                        JSON.stringify(userPreData)
                      );
                      notify("You Seems new to us");
                      setPage("details");
                    } else {
                      //<--------------Logic if user is registered--------------->
                      localStorage.setItem(
                        "token",
                        JSON.stringify(result._tokenResponse.idToken)
                      );
                      localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.ID)
                      );
                      notify("Signed In Successfully");
                      navigate("/");
                    }
                  });
                
            })
}
    return (
      <div className={styles.innerDiv}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Timer setPage={setPage} />
          <br />
          <input
            onChange={(e) => setOtp(e.target.value)}
            required
            type="number"
            placeholder="Enter OTP"
            className={styles.input}
          />
          <br />
          <br />
          <input className={styles.button} type="submit" value="Verify" />
        </form>
        <ToastContainer />
      </div>
    );
}

export default Otp
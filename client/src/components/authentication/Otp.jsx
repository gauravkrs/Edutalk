import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import axios from "axios"
import {useNavigate} from "react-router-dom"
function Otp({ setPage }) {
    const navigate= useNavigate()
    const [otp, setOtp] = useState(0)
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
                    if (response.data.Message === "Not Registered") {
                      const userPreData = {
                        Token: result._tokenResponse.idToken,
                        Phone: result.user.phoneNumber,
                      };
                      localStorage.setItem(
                        "preUser",
                        JSON.stringify(userPreData)
                      );
                      setPage("details");
                    } else {
                        //<--------------Logic--------------->
                        localStorage.setItem(
                          "token",
                          JSON.stringify(result._tokenResponse.idToken)
                        );
                        localStorage.setItem(
                          "user",
                          JSON.stringify(response.data.ID)
                        );
                        alert("Signed in");
                        navigate("/about")
                    }
                  });
                
            })
}
    return (
      <div className={styles.innerDiv}>
        <form onSubmit={(e) => handleSubmit(e)}>
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
      </div>
    );
}

export default Otp
import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import { signInWithPhoneNumber } from "firebase/auth";
import firebaseAuth from "./firebase";
import { RecaptchaVerifier } from "firebase/auth";
function Phone({ setPage }) {
    const [number,setNumber] = useState(0)
  //<---------------------------------------------------------------->//ReCaptcha
  const generateReCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-Div",
      {
        callback: (response) => {},
      },
      firebaseAuth
    );
  };
  //<---------------------------------------------------------------->*****
  const handleSubmit = (e) => {
      e.preventDefault();
      var phone = "+91" + number;
      generateReCaptcha();
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(firebaseAuth, phone, appVerifier)
        .then((confirmation) => {
            window.confirmation = confirmation;
          setPage("otp");
        })
        .catch((error) => {
          console.log(error);
        });
  };
  return (
    <div className={styles.innerDiv}>
      <h1 style={{color:"royalblue", fontSize:"30px"}}>Register Yourself</h1>
      <br />
      <form onSubmit={(e) => handleSubmit(e)}>
              <input
                  onChange={(e)=>setNumber(e.target.value)}
          required
          type="tel"
          placeholder="Enter Phone Number"
          minLength="10"
          maxLength="10"
          pattern="[0-9]{10}"
          className={styles.input}
        />
        <br />
        <br />
        <input className={styles.button} type="submit" value="Send OTP" />
      </form>
      <div
        style={{ width: "100%", margin: "40px auto" }}
        id="recaptcha-Div"
      ></div>
    </div>
  );
}

export default Phone
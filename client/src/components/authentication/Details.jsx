import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import { v4 } from "uuid"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Details() {
    const [type, setType] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [academics, setAcademics] = useState("");
    const [about, setAbout] = useState("")
    const [experience, setExperience] = useState(0)
    const [expertise, setExpertise] = useState("")
  const [charge, setCharge] = useState(0)
  
  const notify = () => toast("Signed In Successfully");


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = JSON.parse(localStorage.getItem("preUser"))
        localStorage.removeItem("preUser")
        var user={}
        if (type) {
            user = {
                ID: v4(),
                Name: name,
                Email: email,
                Phone: data.Phone,
                Wallet: 1000,
                Academics: academics,
                type: "student"
            };
        } else {
            user = {
              ID: v4(),
              Name: name,
              Email: email,
              Phone: data.Phone,
              Charge: charge,
              Experience: experience,
              About: about,
              Expertise: expertise,
              type: "teacher",
            };
        }
      console.log(user)
      axios
        .post("https://edutechb.herokuapp.com/auth/register", user)
        .then((response) => {
          var type;
          if (response.data.Charge) {
            type = "teacher";
          } else type = "student";
          localStorage.setItem("designation", JSON.stringify(type));
          localStorage.setItem("token", JSON.stringify(data.Token));
          localStorage.setItem("user", JSON.stringify(response.data.ID));
          localStorage.removeItem("preUser");
          notify();
        });
    }
    return (
      <div className={styles.innerDiv}>
        <h1 style={{ color: "royalblue", fontSize: "25px" }}>
          New user? Help us know you better :
        </h1>
        <br />
        <button onClick={() => setType(!type)} className={styles.type}>
          {type ? "Student" : "Teacher"}
        </button>
        <br />
        <br />
        {!type ? (
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              type="text"
              placeholder="Enter Name"
            />
            <br />
            <br />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              type="email"
              placeholder="Enter Email"
            />
            <br />
            <br />
            <input
              onChange={(e) => setAbout(e.target.value)}
              className={styles.input}
              type="text"
              placeholder="About"
            />
            <br />
            <br />
            <input
              onChange={(e) => setExperience(e.target.value)}
              className={styles.input}
              type="number"
              placeholder="Years of Experience"
            />
            <br />
            <br />
            <input
              onChange={(e) => setCharge(e.target.value)}
              className={styles.input}
              type="number"
              placeholder="Charge You Take Per Minute"
            />
            <br />
            <br />
            <input
              onChange={(e) => setExpertise(e.target.value)}
              className={styles.input}
              type="text"
              placeholder="Subject of Expertise"
            />
            <br />
            <br />
            <input className={styles.button} type="submit" value="Let's Go" />
            <ToastContainer />
          </form>
        ) : (
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              type="text"
              placeholder="Enter Name"
            />
            <br />
            <br />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              type="email"
              placeholder="Enter Email"
            />
            <br />
            <br />
            <input
              onChange={(e) => setAcademics(e.target.value)}
              className={styles.input}
              type="text"
              placeholder="Subject"
            />
            <br />
            <br />
            <input className={styles.button} type="submit" value="Let's Go" />
            <ToastContainer />
          </form>
        )}
      </div>
    );
}

export default Details
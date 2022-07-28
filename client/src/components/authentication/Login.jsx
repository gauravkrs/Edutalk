import React,{useState,useEffect} from 'react'
import styles from "./login.module.css"
import Phone from "./Phone"
import Otp from "./Otp"
import Details from "./Details"
function Login() {
  const [page,setPage]= useState("phone")
  return (
    <div className={styles.container}>
      {page == "phone" && <Phone setPage={setPage} />}
      {page == "details" && <Details setPage={setPage} />}
      {page == "otp" && <Otp setPage={setPage} />}
    </div>
  );
}

export default Login
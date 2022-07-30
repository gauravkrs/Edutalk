import React, { useState,useEffect } from "react";
import {useNavigate} from "react-router-dom"
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export const Payment = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  useEffect(() => {
    const type = JSON.parse(localStorage.getItem("designation")) || "";
    if (type == "teacher") navigate("/account");
    else if (type == "") navigate("/");
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const res = await axios.post("http://localhost:8000/payment", {
          amount: 1000,
          id,
        });
        if (res.data.success) {
          console.log("Successful Payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("err", error);
      }
    } else {
      console.log(error.message);
    }
  };
  return (
    <div
      style={{
        padding: "100px",
        width: "50%",
        margin: "auto",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
      }}
    >
      {!success ? (
        <form
          onSubmit={handleSubmit}
          style={{ width: "70%", margin: "auto", textAlign: "center" }}
        >
          <fieldset>
            <div style={{ background: "whitesmoke", padding: "5px" }}>
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <br />
          <br />
          <button
            style={{
              width: "50%",
              color: "white",
              background: "black",
              padding: "5px",
            }}
          >
            Pay
          </button>
        </form>
      ) : (
        <div style={{textAlign: "center"}}>
          <h2 style={{textAlign: "justify", color: "#66a3bb", fontSize: "20px"}}>
            You just recharge your wallet, this is best decision of your life to
            enjoy our service
          </h2>
          <br />
          <br />
          <button
            style={{
              width: "50%",
              color: "white",
              background: "royalblue",
              padding: "10px",
            }}
            onClick={() => navigate("/account")}
          >
            Check Your wallet
          </button>
        </div>
      )}
    </div>
  );
};

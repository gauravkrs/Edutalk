import React, { useEffect } from "react";
import displayRazorpay from "../../utils/PaymentGateway";

export const Payment = () => {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Payment for your talk</h1>
      <button onClick={displayRazorpay}>Pay</button>
    </div>
  );
};

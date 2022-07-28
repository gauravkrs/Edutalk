import React, { useEffect } from "react";
import displayRazorpay from "../../utils/PaymentGateway";

export const Payment = () => {
  
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Payment for your talk</h1>
      <button onClick={displayRazorpay}>Pay</button>
    </div>
  );
};

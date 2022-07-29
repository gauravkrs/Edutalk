import React, { useEffect } from "react";
// import { Payment } from "./components/Payment/Payment";
import Main from "./Main";
function App() {
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
    <div className="App">
      <Main/>
      {/* <Payment /> */}
    </div>
  );
}

export default App;

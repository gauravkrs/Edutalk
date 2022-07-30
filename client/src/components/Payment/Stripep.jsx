import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Payment } from "./Payment";
import { loadStripe } from "@stripe/stripe-js";

const PUBLIC_KEY =
  "pk_test_51LQpJuSBPfPStIn6uW6s5NhBM6YcTcSwo9bVdBQtuBhTm1M9VmUUV4Sdgu2GsM1GV01KNdR1bhYnYLLcxtfkmbUI00niV1mYgW";

const stripeTest = loadStripe(PUBLIC_KEY);
export const Stripep = () => {
  return (
    <Elements stripe={stripeTest}>
      <Payment />
    </Elements>
  );
};

const { Router } = require("express");
const Razorpay = require("razorpay");
const shortId = require("shortid");
const paymentRouter = Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_RmmFuCzmdYspcf",
  key_secret: "4hfPBupTgbJs9bl7gguPV6LU",
});

paymentRouter.post("/", async (req, res) => {
  const payment_capture = 1;
  const amount = 499;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency: currency,
    receipt: shortId.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log("err", error);
  }
});

paymentRouter.get("/", async (req, res) => {
  res.json({});
});

module.exports = paymentRouter;

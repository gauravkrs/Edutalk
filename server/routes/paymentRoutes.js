const { Router } = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const paymentRouter = Router();

paymentRouter.post("/", async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "INR",
      description: "Edutech company",
      payment_method: id,
      confirm: true,
    });
    console.log("Pay", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("err", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

module.exports = paymentRouter;

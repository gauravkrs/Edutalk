export default async function displayRazorpay() {
  //simple post the node.js server
  const data = await fetch("http://localhost:8000/razorpay", {
    method: "POST",
  }).then((t) => t.json);
  console.log(data);

  //options
  const options = {
    key: "rzp_test_RmmFuCzmdYspcf",
    currency: data.currency,
    amount: data.amount,
    description: "Wallet Transaction",
    order_id: data.id,
    handler: function (response) {
      alert("PAYMENT Id : " + response.razor_pay_id);
      alert("ORDER ID: " + response.razor_order_id);
    },
    prefill: {
      name: "Gaurav ",
      email: "abc@gmail.com",
      contact: "9874561135",
    },
  };

  const paymentObj = new window.Razorpay(options);

  paymentObj.open();
  console.log(paymentObj.open());
}

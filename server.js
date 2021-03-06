const express = require("express");
const app = express();
const stripe = require("stripe")(
  "sk_test_51LM4uyBPSKEcwyhuqCejrTXSvpSMGFVgU8rHv04T4c7Sqq8eu4y7DcvnGbezlCWGKnGpB6EAMBPHlvivz6Ey4Ucu00kC1a51gl"
);

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));

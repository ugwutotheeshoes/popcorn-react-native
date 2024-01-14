const stripe = require("stripe")(
  "sk_test_51LXcI0CJuM28O4MVPJrt4Ahorox1P42pJGzBAWZk1XbWTsZ3gYtk2WGBUWZBhsbIKfVY1oVoLmwO0dMcwspK7sJX00FjZnbI9F"
);
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

app.post("/payment-sheet", async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2022-08-01" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "eur",
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      "pk_test_51LXcI0CJuM28O4MVPiQ7SpoMYT4g5rsRzHGPgpUiN3GEhYEKdHJv5keZYAd5gXsynFgptWUyUAZ3jQVaQzgL2IY900dRjSfldV",
  });
});

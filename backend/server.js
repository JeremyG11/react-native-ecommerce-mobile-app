require("dotenv").config()
const express = require("express");
const stripe = require("stripe")(process.env.SECRET_KEY)
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
app.use(cors());

// connect Database
connectDB();

// Init Middleware
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// app.post('/payment-sheet', async (req, res) => {
//   const customer = await stripe.customers.create();
//   const ephemeralKey = await stripe.ephemeralKeys.create(
//     { customer: customer.id },
//     { apiVersion: '2022-11-15' }
//   );
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1000,
//     currency: 'usd',
//     customer: customer.id,
//     payment_method_types: ['card'],

//   });

//   return res.json({
//     paymentIntent: paymentIntent.client_secret,
//     ephemeralKey: ephemeralKey.secret,
//     customer: customer.id,
//     publishableKey: process.env.PUBLISHABLE_KEY
//   });
// });


const PORT = process.env.PORT || 6000;

// Define Routes
app.use("/api/auth-user", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/payment", require("./routes/checkoutPayment"));

app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});
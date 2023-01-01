const express = require("express");
require("dotenv").config()
const router = express.Router();
const auth = require("../middleware/auth");
const stripe = require("stripe")(process.env.SECRET_KEY)
const Product = require("../models/Product");


router.post("/checkout/session", async (req, res) => {
    try {
        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: '2022-11-15' }
        );
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000,
            currency: 'usd',
            customer: customer.id,
            payment_method_types: ['card'],

        });

        return res.json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
            publishableKey: process.env.PUBLISHABLE_KEY
        });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

});

module.exports = router; 
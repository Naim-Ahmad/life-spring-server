const verifyToken = require("../../middlewares/verifyToken");

const router = require("express").Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create_payment_intent", verifyToken, async (req, res) => {
  const { price } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(price * 100),
        currency: 'inr',
        automatic_payment_methods: {
            enabled: true,
        }
    })
    // console.log(paymentIntent);
    res.send({clientSecret: paymentIntent.client_secret});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
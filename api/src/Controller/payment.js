require("dotenv").config();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.KEY)


const payment = async (req, res) => {
  const { userId } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    phone_number_collection: {
      enabled: true,
    },
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Plan premium"
          },
          unit_amount: 2400,
        },
        quantity: 1,
      },
    ],
    mode: "payment",

    success_url: 'http://localhost:3000/home/sucess',
    cancel_url: 'http://localhost:3000/home'
  });

  res.json({ url: session.url });
};


module.exports = payment;
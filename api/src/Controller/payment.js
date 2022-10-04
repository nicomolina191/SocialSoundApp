require("dotenv").config();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.KEY)
const { PRICES_ID } = process.env


const payment = async (req, res) => {
  const { userId } = req.body;

  const session = await stripe.checkout.sessions.create({
    // payment_method_types: ["card"],
    // phone_number_collection: {
    //   enabled: true,
    // },
    // line_items: [
    //   {
    //     price_data: {
    //       currency: "usd",
    //       product_data: {
    //         name: "Free trial for 30 days! after date,You will be charged per month, plus the ability to play your music in the background."
    //       },
    //       unit_amount: 1000,
    //     },
    //     quantity: 1,
    //   },
    // ],

    mode: "subscription",
    line_items: [{price: PRICES_ID, quantity: 1}],

    success_url: 'https://www.socialsound.art/home/success',
    cancel_url: 'https://www.socialsound.art/home'
  });

  res.json({ url: session.url });
};


module.exports = payment;
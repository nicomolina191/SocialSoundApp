const Stripe = require('stripe');
const stripe = new Stripe(process.env.KEY)

const payment = async(req, res) => {
    const {id, amount} = req.body;
    try {
    //  const payment = await stripe.paymentIntents.create({
    //       amount,
    //       currency: "USD",
    //       description: "Users premium",
    //       payment_method: id,
    //       confirm: true
    //    })
    //    console.log(payment);
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Plan Premium',
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/pay',
      });
      console.log(session);
      res.send({ url: session.url });
    }catch(err) {
        console.log(err.message);
        res.status(401).json({err: 'Error number card'});
    }
}


    


module.exports = payment;
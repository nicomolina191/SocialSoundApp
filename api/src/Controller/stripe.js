const Stripe = require('stripe');
const stripe = new Stripe(process.env.KEY)

const payment = async(req, res) => {
    const {id, amount} = req.body;
    try {
     const payment = await stripe.paymentIntents.create({
          amount,
          currency: "USD",
          description: "Users premium",
          payment_method: id,
          confirm: true
       })
       console.log(payment);
        res.status(200).send({message: 'Succesfull Payment'});
    }catch(err) {
        console.log(err.message);
        res.status(401).json({err: 'Error number card'});
    }
}

module.exports = payment;
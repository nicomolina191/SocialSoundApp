const Stripe = require('stripe');
const stripe = new Stripe(process.env.KEY)

const payment = async (req, res) => {
   
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            phone_number_collection: {
              enabled: true,
            },
            line_items:[
              {  
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Plan Premium"
                    },
                    unit_amount: 1000,
                },
                quantity: 1,
                 },
            ],
            mode: "payment",
            // customer: customer.id,
            success_url: 'http://localhost:3000/sucess',
            cancel_url: 'http://localhost:3000/home',
          });
       
          res.send({ url: session.url });



        
};


module.exports = payment;
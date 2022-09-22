const Stripe = require('stripe');
const stripe = new Stripe(process.env.KEY)


const payment = async (req, res) => {
   const {userId} = req.body;
   console.log("hola id 2", userId);


        const session = await stripe.checkout.sessions.create({
            
            payment_method_types: ["card"],
            phone_number_collection: {
              enabled: true,
            },
            line_items: [
              {
                price_data: {
                  currency: "usd",
                  product_data:{
                    name: "Plan premium"
                  },
                  unit_amount: 1000,
                },
                quantity: 1,
              },
            ],
            mode: "payment",
            success_url: 'http://localhost:3000/sucess',
            cancel_url: 'http://localhost:3000/home',

          });
          
          res.json({ url: session.url });



        
};


module.exports = payment;
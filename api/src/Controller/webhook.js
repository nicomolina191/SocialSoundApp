const Stripe = require('stripe');
const upToPremium = require('./Users/upToPremium');
const stripe = new Stripe(process.env.KEY)
const { Users} = require('../db.js');


const postWebhook = async(req, res) => {
 let data;
 let eventType;
 
  //recibir notificaciones
  const endPointSecret = "whsec_442ae1484f5a10b97f1d1800c8796583061c7e3e328887fa5bc5a29ba6826310";

 if(endPointSecret){
  let event;
  const sig = req.headers['stripe-signature']   
  try {
  //      const user = await Users.findByPk(req.body.data.description);
 
  //      user.update({
  //      plan: 'Premium'
  //  });
  //     console.log(user);
  //      await user.save();
       event = stripe.webhooks.constructEvent( req.body , sig, endPointSecret)
     } catch (err) {
       console.log(` Error message: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`)
     }
     data = event.data.object;
     eventType = event.type;
 }else{
  data = req.body.data.object;
  eventType = req.body.type;
 }
 

     // Handle the checkout.session.completed event
   if ( eventType === 'checkout.session.completed') {
    stripe.customers.retrieve(data.customers)
    .then((customer)=> {
      console.log(customer);
      console.log("data", data);
    })
    .catch((err)=> console.log(err))
  }
  //   const session = event.data.object;
  //   // const premium = await upToPremium(userId)
  //   // Fulfill the purchase...
  //   fulfillOrder(session);
  // }
      // Successfully constructed event
  // console.log('✅ Success:', event.id);

    res.status(200).send().end();

};



module.exports = postWebhook;
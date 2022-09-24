// const Stripe = require('stripe');
// const upToPremium = require('./Users/upToPremium');
// const stripe = new Stripe(process.env.KEY)
// const { Users} = require('../db.js');


// const postWebhook = async(req, res) => {
//  let data;
//  let eventType;
 
//   //recibir notificaciones
//   const endPointSecret = process.env.KEY_SECRET;

//  if(endPointSecret){
//   let event;
//   const sig = req.headers['stripe-signature']   
//   try { 
//       event = stripe.webhooks.constructEvent( req.body , sig, endPointSecret)
//      } catch (err) {
//        console.log(` Error message: ${err.message}`);
//         return res.status(400).send(`Webhook Error: ${err.message}`)
//      }
//         data = event.data.object;
//          eventType = event.type;
//     }else{
//           data = req.body.data.object;
//            eventType = req.body.type;
//  }
 

//       // Handle the checkout.session.completed event
//        if ( eventType === 'checkout.session.completed') {
//      stripe.customers.retrieve(data.customers)
//     .then((customer)=> {
//       console.log(customer);
//       console.log("data", data);
//     })
//     .catch((err)=> console.log(err))
//   }
//     res.status(200).send().end();

// };



// module.exports = postWebhook;
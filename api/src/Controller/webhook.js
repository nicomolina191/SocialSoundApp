const Stripe = require('stripe');
const stripe = new Stripe(process.env.KEY)
 //recibir notificaciones
const endPointSecret = "whsec_442ae1484f5a10b97f1d1800c8796583061c7e3e328887fa5bc5a29ba6826310";

const postWebhook = async(req, res) => {
 const sig = req.headers['stripe-signature']   
 const payload = req.body;

 console.log('Got payload: ' + JSON.stringify(payload));

 const fulfillOrder = (session) => {
    // TODO: fill me in
    console.log("Fulfilling order", session);
  }
 let event;
 try {
     event = stripe.webhooks.constructEvent(payload, sig, endPointSecret)
    } catch (error) {
        return res.status(400).send(`Webhook Error: ${error.message}`)
    }
     // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Fulfill the purchase...
    fulfillOrder(session);
  }
    
    res.status(200);
}



module.exports = postWebhook;
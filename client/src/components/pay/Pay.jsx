import React, { useState } from 'react'
import style from './pay.module.css'
import { loadStripe } from '@stripe/stripe-js'
import { CircularProgress } from "@mui/material";
import axios from 'axios'
import { Elements, CardElement, useStripe , useElements} from '@stripe/react-stripe-js' //englobar a otros componentes para que tengan acceso a la conexion de stripe
//publishablekey, contraseña que me da stripe
//manera de conectarme con stripe
const stripePromise = loadStripe("pk_test_51LijfIBicyXOJpPqS8CR5YQsXku9uqirabKCieD2cT9boY15oKrDoP47nRqmgGrSnbePLJdAQAZsna1rBqhGqmdC00DHN0ctW1")

const CheckoutForm = () => {
//me devuelve la conexion a stripe
 const stripe = useStripe();
 //funcion que puede acceder a los elementos de stripe
 const element = useElements();
 
 const [loading, setLoading] = useState(false);

// const handleSubmit = async(e) => {
// e.preventDefault();
// //desde el objeto de stripe
// const {error, paymentMethod} = await stripe.createPaymentMethod({
//   type: 'card',
//   card: element.getElement(CardElement)
// });
// setLoading(true);
// if(!error){
//   const { id } = paymentMethod;
//   try {
//     const data = await axios.post("http://localhost:3001/payment", {
//       id,
//       amount: 1000
//     });
//     console.log(data.data.message);
//     element.getElement(CardElement).clear();
    
//   } catch (error) {
//     console.log(error.message);
//   };
// setLoading(false);
// };

// }; 

const handleCheckOut = async(e) => {
  e.preventDefault()
  try {
    const data = await axios.post('http://localhost:3001/create-checkout-session')
    console.log(data);
         if (data.data.url) {
          return window.location.href = data.data.url;
         }
    
  } catch (error) {
    console.log(error);
  }
}

return <form action="/create-checkout-session" method="POST" className={style.card}>
       <img src={"https://www.tegendraads.nl/wp-content/uploads/2018/04/TD_Case_PSS1.jpg"} alt="" />
       <h4>PRICE : USD$20.00</h4>
       {/* <CardElement className={style.cardElement}/> */}
       <div className={style.divBtn}>
       <button type='submit' className={style.button} disabled={!stripe} onClick={(e)=>handleCheckOut(e)}>
         {
           loading 
           ?  (<span className={style.spinner}><CircularProgress /></span>)
           : "Check-out"
         }
       </button>
       </div>
       </form>
};

const Pay = () => {
  

  return (
    <Elements stripe = {stripePromise}>
      <div className={style.container}>
        <div className={style.row}>
         <CheckoutForm />
        </div>
      </div>
    </Elements>
  )
}



export default Pay;
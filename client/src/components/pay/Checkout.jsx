import React from 'react'

const Checkout = () => {
  return (
    <>
  <head>
    <title>Buy cool new product</title>
  </head>
  <>
    <form action="/create-checkout-session" method="POST">
      <button type="submit">Checkout</button>
    </form>
  </>
   </>
  )
}

export default Checkout
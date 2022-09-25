import axios from "axios";
import style from './index.module.css';
// import { url } from "../slices/api";

const PayButton = () => {

  const handleCheckout = () => {
    let premium = localStorage.getItem("premium");
    if(premium) localStorage.removeItem("premium");
    localStorage.setItem("premium", true)
    axios
      .post("/create-checkout-session", {
       description: 'Plan Premium',
       amount: 2400,
       quantity: 1,
       
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className={style.divButton}>
      <button className={style.bt} onClick={() => handleCheckout()}>Premium</button>
    </div>
  );
};

export default PayButton;

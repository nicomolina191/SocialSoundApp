import axios from "axios";
import style from './index.module.css';
// import { useSelector } from "react-redux";
// import { url } from "../slices/api";

const PayButton = () => {
  // const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios
      .post("/create-checkout-session", {
       description: 'Plan Premium',
       amount: 1000
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

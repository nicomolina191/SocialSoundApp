import axios from "axios";
// import { useSelector } from "react-redux";
// import { url } from "../slices/api";

const PayButton = () => {
  // const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios
      .post("/create-checkout-session", {

       amount: 1000
      })
      .then((response) => {
        console.log(response);
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;

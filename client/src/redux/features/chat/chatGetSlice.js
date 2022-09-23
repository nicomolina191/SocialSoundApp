import axios from "axios";
import { changeUser } from "./chatSlice";

//obtener los generos
export const changeUserChat = (u) => {
  return (dispatch) => {
      dispatch(changeUser(u));
  };
};
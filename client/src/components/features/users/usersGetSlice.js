import axios from "axios";
import { addUsers,deleteUsers,getUserError,getUserStart,getUserSuccess,updateUsers } from "./userSlice";

//obtener los users
export const getUser = () => {
  return async (dispatch) => {
    dispatch(getUserStart());
    try {
      const response = await axios.get("/users");
      dispatch(getUserSuccess(response.data));
    } catch (error) {
      dispatch(getUserError(error));
    }
  };
};

//crear users
export const createdUser = (user) => {
  return async (dispatch) => {
    let response = await axios.post("/users", user);
    dispatch(addUsers(response.data));
  };
};

//actualizar user
export const updateUser = (nickname, body) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/users/${nickname}`, body);
      if (response) {
        dispatch(updateUsers());
        dispatch(getUser());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//eliminar user
export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      await axios.put(`/users/${id}`);
      dispatch(deleteUsers());
      dispatch(getUser());
    } catch (error) {
      console.log(error);
    }
  };
};
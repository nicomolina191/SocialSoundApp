import axios from "axios";
import { addUsers, deleteUsers, getUserError, getUserStart, getUserSuccess, updateUsers, getById, getByFirebaseId, getUpdatePremium  } from "./usersSlice";


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
export const updateUser = (id, body) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/users/${id}`, body);
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

export const getUserById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/users/${id}`)
      dispatch(getById(response.data))
    } catch (error) {
      console.log(error);
    }
  }
}
export const getUserByFirebaseId = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/users/idgoogle/${id}`)
      dispatch(getByFirebaseId(response.data))
    }
    catch (error) {
      console.log(error)
    }
  }
}


export const getUserUpdatePremium = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/users/premium/${id}`)
      dispatch(getUpdatePremium(response.data))
    } catch (error) {
      console.log(error);
    }
  }
}
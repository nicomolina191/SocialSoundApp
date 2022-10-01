import axios from "axios";
import { addUsers, deleteUsers, getUserError, getUserStart, getUserSuccess, updateUsers, getById, getByFirebaseId, getUpdatePremium, getLikes, setGenres, getNotifications, createNotification, watchedNotification, disabledNotification, getDownToRegular  } from "./usersSlice";


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

export const setUserGenres = (body) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/users/set/genres`, body);
      if (response) {
        dispatch(setGenres());
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
      dispatch(getUserNotification(response.data.id))
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
};

export const getUserDownToRegular = (id) => {
  return async (dispatch) => {
   try {
      const response = await axios.put(`/users/regular/${id}`)
      dispatch(getDownToRegular(response.data))
   } catch (error) {
     console.log(error);
   }
  }
};

export const getUserLikes = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/likes/users/${id}`)
      dispatch(getLikes(response.data))
    } catch (error) {
      console.log(error);
    }
  }
};

export const getUserNotification = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/notifications/${id}`)
      await  dispatch(getNotifications(response.data))
    } catch (error) {
      console.log(error);
    }
  }
};

export const createUserNotification = (value) => {
  return async (dispatch) => {
    try {
    const response = await axios.post('/notifications/create', value)
    // dispatch(createNotification(response.data))
  } catch (error) {
    console.log(error);
  }
}
};

export const watchedUserNotification = (id) => {
 return async(dispatch) => {
  try {
    const response = await axios.put(`/notifications/watched/${id}`)
    dispatch(watchedNotification(response.data))
  } catch (error) {
    console.log(error);
  }
 }
};

export const disabledUserNotification = (id) => {
  return async(dispatch) => {
    try {
      const response = await axios.put(`/notifications/disabled/${id}`)
      dispatch(disabledNotification(response.data))
    } catch (error) {
      console.log(error);
    }
  }
};

import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  usersList: [],
  usersListAll: [],
  user:{},
  userLikes: [],
  userNotifications: [],
  isLoading: true,
  currentUser: {}
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.usersList.push(action.payload);
    },
    deleteUsers: (state) => {
      return {
        ...state,
      };
    },
    updateUsers: (state) => {
      return {
        ...state,
      };
    },
    getUserStart: (state) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    },
    getUserSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        usersListAll: action.payload,
        usersList: action.payload,
      };
    },
    getUserError: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },
    getById:(state, action)=>{
      return {
        ...state,
        user: action.payload
      }
    },
    getByFirebaseId: (state, action)=>{
      return {
        ...state,
        currentUser: action.payload
      }
    },
    getUpdatePremium : (state, action)=> {
      return {
        ...state,
        currentUser: action.payload
      }
    },
    getLikes : (state, action)=> {
      return {
        ...state,
        userLikes: action.payload
      }
    },
    getNotifications: (state, action)=> {
      return {
        ...state,
        userNotifications: action.payload
      }
    },
    createNotification: (state, action)=> {
        state.userNotifications.push(action.payload)    
    },

    watchedNotification: (state, action) => {
      return {
        ...state,
        userNotifications: action.payload
      }
    },
    disabledNotification: (state, action) => {
      return {
        ...state,
        userNotifications: action.payload
      }
    }
  },
});


export const { addUsers, deleteUsers, updateUsers, getUserStart, getUserError, getUserSuccess, getById, getByFirebaseId, getUpdatePremium, getLikes, getNotifications, createNotification, watchedNotification, disabledNotification  } = userSlice.actions;

export default userSlice.reducer;


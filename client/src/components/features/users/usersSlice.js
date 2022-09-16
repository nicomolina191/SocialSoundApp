import{ createSlice } from '@reduxjs/toolkit'
const initialState = {
    usersList: [],
    usersListAll: [],
    isLoading: true,
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
      getUserStart(state) {
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      },
      getUserSuccess(state, action) {
        return {
          ...state,
          isLoading: false,
          error: null,
          usersListAll: action.payload,
          usersList: action.payload,
        };
      },
      getUserError(state, action) {
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        };
      },
    },
  });


  export const { addUsers,deleteUsers,updateUsers,getUserStart,getUserError,getUserSuccess } = userSlice.actions;
  
  export default userSlice.reducer;


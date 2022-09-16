import { configureStore } from '@reduxjs/toolkit'
import  usersReducer  from './features/users/usersSlice'
import postsReducer from './features/post/postSlice'

//If I have several files, data, they will all be grouped into one to be able to access from anywhere
const store = configureStore({
  reducer:{
    users: usersReducer,
    posts: postsReducer

  }
});

export default store
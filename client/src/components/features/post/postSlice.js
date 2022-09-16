import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  postList: [],
  possListAll: [],
  isLoading: true,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action)=> {
     state.postList.push(action.payload)
    },
    deletePosts: (state) => {
     return {
       ...state,
     }
    },
    updatePosts: (state)=> {
     return {
       ...state
     }
    },
    getPostStart(state){
      return {
      ...state,
      isLoading: true,
      error: null,
      }
    },
    getPostSuccess(state, action) {
       return {
         ...state,
         isLoading: false,
         error: null,
         possListAll: action.payload,
         postList: action.payload,
       };
    },
    getPostError(state, action){
      return{
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },  
  }});


 export const {addPosts, deletePosts,updatePosts, getPostStart, getPostError, getPostSuccess } = postSlice.actions;

export default postSlice.reducer;
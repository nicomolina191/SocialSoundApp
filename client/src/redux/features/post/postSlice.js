import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  postList: [],
  possListAll: [],
  isLoading: true,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action) => {
      state.postList.push(action.payload)
    },
    deletePosts: (state) => {
      return {
        ...state,
      }
    },
    updatePosts: (state) => {
      return {
        ...state
      }
    },
    getPostStart: (state) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    },
    getPostSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        possListAll: action.payload,
        postList: action.payload,
      };
    },
    getPostError: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },
    getAllPostByGenre: (state, action) => {
      return {
        ...state,
        postList: action.payload,
      }
    }, 
    getAllPostByTime: (state, action) => {
      return {
        ...state,
        postList: action.payload,
      }
    }
  }
});


export const { addPosts, deletePosts, updatePosts, getPostStart, getPostError, getPostSuccess, getAllPostByGenre, getAllPostByTime } = postSlice.actions;

export default postSlice.reducer;
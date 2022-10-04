import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  postList: [],
  possListAll: [],
  postsFiltered: [],
  postsOrdered: [],
  post: {},
  isLoading: true,
  error: false,
  reportedPosts: []
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action) => {
      return {
        ...state,
        postList: [...state.postList, action.payload],
        postsFiltered: [action.payload, ...state.postsFiltered]
      }
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
        postsFiltered: action.payload
      }
    },
    getAllPostByTime: (state, action) => {
      return {
        ...state,
        postList: action.payload,
        postsFiltered: action.payload,
        postsOrdered: action.payload
      }
    },
    getAllPostByPopularity: (state, action) => {
      return {
        ...state,
        postList: action.payload,
        postsFiltered: action.payload,
        postsOrdered: action.payload
      }
    },
    getAllPostByRelevance: (state, action) => {
      return {
        ...state,
        postList: action.payload,
        postsFiltered: action.payload,
        postsOrdered: action.payload
      }
    },
    getCurrentPostById: (state, action) => {
      return {
        ...state,
        post: action.payload
      }
    },
    clearCurrentPost: (state, action) => {
      return {
        ...state,
        post: {}
      }
    },
    getPostsReported: (state, action) => {
      return {
        ...state,
        reportedPosts: action.payload
      }
    }
  }
});


export const { getPostsReported, addPosts, deletePosts, updatePosts, getPostStart, getPostError, getPostSuccess, getAllPostByGenre, getAllPostByTime, getCurrentPostById, clearCurrentPost, getAllPostByPopularity, getAllPostByRelevance } = postSlice.actions;

export default postSlice.reducer;
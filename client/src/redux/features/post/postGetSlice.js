import axios from "axios";
import { addPosts, deletePosts, getPostError, getPostStart, getPostSuccess, updatePosts, getAllPostByGenre, getAllPostByTime, getCurrentPostById, clearCurrentPost } from "./postSlice";

//obtener los users
export const getPost = () => {
  return async (dispatch) => {
    dispatch(getPostStart());
    try {
      const response = await axios.get("/posts");
      dispatch(getPostSuccess(response.data));
    } catch (error) {
      dispatch(getPostError(error));
    }
  };
};

//crear users
export const createdPost = (body) => {
  return async (dispatch) => {
    let response = await axios.post("/posts", body);
    dispatch(addPosts(response.data));
  };
};

//actualizar user
export const updatePost = (id, body) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/posts/${id}`, body);
      if (response) {
        dispatch(updatePosts());
        dispatch(getPost());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//eliminar user
export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      await axios.put(`/posts/${id}`);
      dispatch(deletePosts());
      dispatch(getPost());
    } catch (error) {
      console.log(error);
    }
  };
};

//get post by genre
export const getPostByGenre = (genres) => {
  return async (dispatch) => {
    try {
      let response = await axios.post('/posts/genres', genres)
      dispatch(getAllPostByGenre(response.data))
    } catch (error) {
      console.log(error);
    }
  }
}

//get post by time, pop
export const getPostByTime = (order) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/posts/order/${order}`);
      dispatch(getAllPostByTime(response.data))
    } catch (error) {
      console.log(error);
    }
  }
}

export const getPostById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/posts/${id}`)
      dispatch(getCurrentPostById(response.data))
    } catch (error) {
      console.log(error);
    }
  }
}

export const clearPost=()=>{
  return (dispatch)=>{
    dispatch(clearCurrentPost())
  }
}
import axios from "axios";
import { addPosts, deletePosts, getPostError, getPostStart, getPostSuccess, updatePosts, getAllPostByGenre } from "./postSlice";

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
    let response = await axios.post("/post", body);
    dispatch(addPosts(response.data));
  };
};

//actualizar user
export const updatePost = (id, body) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/post/${id}`, body);
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
      await axios.put(`/post/${id}`);
      dispatch(deletePosts());
      dispatch(getPost());
    } catch (error) {
      console.log(error);
    }
  };
};

//get post by genre
export const getPostByGenre = (genre) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/posts/genre/${genre}`);
      dispatch(getAllPostByGenre(response.data))
    } catch (error) {
      console.log(error);
    }
  }
}
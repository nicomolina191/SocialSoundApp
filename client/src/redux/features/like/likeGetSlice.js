import axios from "axios";
import { getVideoLikesSlice, getSongLikesSlice } from "./likeSlice";

export const  getLikesByUserId = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/likes/users/${id}`);
            dispatch(getVideoLikesSlice(response.data.filter(like => like.isActive).map(like => like.post).filter(post => post?.type === 'video')));
        } catch (error) {
            console.log(error);
        }
    };
};

export const  getSongsLikesByUserId = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/likes/users/${id}`);
            dispatch(getSongLikesSlice(response.data.filter(like => like.isActive).map(like => like.post).filter(post => post?.type === 'audio')));
        } catch (error) {
            console.log(error);
        }
    };
};
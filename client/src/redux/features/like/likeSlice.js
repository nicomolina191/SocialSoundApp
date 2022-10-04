import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    likesVideoCurrentUser: [],
    likesSongCurrentUser: []
};

export const likeSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        addLikeSlice: (state, action) => {
            return {
                ...state,
                likesVideoCurrentUser: [...state.likesVideoCurrentUser, action.payload],
                likesSongCurrentUser: [...state.likesSongCurrentUser, action.payload]
            }
        },
        updateLikesSlice: (state) => {
            return {
                ...state
            }
        },
        getVideoLikesSlice: (state, action) => {
            return {
                ...state,
                likesVideoCurrentUser: action.payload
            }
        },
        getSongLikesSlice: (state, action) => {
            return {
                ...state,
                likesSongCurrentUser: action.payload
            }
        }
    }
});


export const { addLikeSlice, updateLikesSlice, getVideoLikesSlice, getSongLikesSlice } = likeSlice.actions;

export default likeSlice.reducer;
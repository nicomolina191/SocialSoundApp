import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    likesVideoCurrentUser: []
};

export const likeSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        addLikeSlice: (state, action) => {
            return {
                ...state,
                likesVideoCurrentUser: [...state.likesVideoCurrentUser, action.payload]
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
        }
    }
});


export const { addLikeSlice, updateLikesSlice, getVideoLikesSlice } = likeSlice.actions;

export default likeSlice.reducer;
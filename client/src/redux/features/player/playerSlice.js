import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTrackIndex: 0,
  tracks: []
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
      next: (state, action) => {
        return {
          ...state,
          currentTrackIndex: currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0
        };
      },
      previous: (state, action) => {
        return {
            ...state,
            currentTrackIndex: currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1
        }
      },
      set: (state, action) => {
        return {
            ...state,
            tracks: action.payload
        }
      },
      add: (state, action) => {
        return {
            ...state,
            tracks: [...state.tracks, action.payload]
        }
      },
      remove: (state, action) => {
        return {
            ...state,
            tracks: [...state.tracks].filter(t => t.id !== action.payload.id)
        }
      }
  }
});


export const { next, previous, add, remove, set } = playerSlice.actions;

export default playerSlice.reducer;
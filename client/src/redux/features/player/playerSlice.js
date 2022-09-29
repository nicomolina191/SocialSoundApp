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
          currentTrackIndex: state.currentTrackIndex < state.tracks.length - 1 ? state.currentTrackIndex + 1 : 0
        };
      },
      previous: (state, action) => {
        return {
            ...state,
            currentTrackIndex: state.currentTrackIndex === 0 ? state.tracks.length - 1 : state.currentTrackIndex - 1
        }
      },
      set: (state, action) => {
        return {
            ...state,
            tracks: action.payload,
            currentTrackIndex: 0
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
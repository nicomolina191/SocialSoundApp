import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTrackIndex: 0,
  tracks: [ ],
  isPlaying: false,
  nowPlaying: {}
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
      next: (state) => {
        return {
          ...state,
          currentTrackIndex: state.currentTrackIndex < [...state.tracks].length - 1 ? state.currentTrackIndex + 1 : 0,
          nowPlaying: [...state.tracks][state.currentTrackIndex < [...state.tracks].length - 1 ? state.currentTrackIndex + 1 : 0]
        };
      },
      previous: (state) => {
        return {
            ...state,
            currentTrackIndex: state.currentTrackIndex === 0 ? [...state.tracks].length - 1 : state.currentTrackIndex - 1,
            nowPlaying: [...state.tracks][state.currentTrackIndex === 0 ? [...state.tracks].length - 1 : state.currentTrackIndex - 1]
        }
      },
      set: (state, action) => {
        return {
            ...state,
            tracks: action.payload,
            currentTrackIndex: state.currentTrackIndex !== 0 ? 0 : state.currentTrackIndex,
            nowPlaying: [...state.tracks][state.currentTrackIndex !== 0 ? 0 : state.currentTrackIndex]
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
      },
      toggle: (state) => {
        return {
            ...state,
            isPlaying: !state.isPlaying
        }
      }
  }
});


export const { next, previous, add, remove, set, toggle } = playerSlice.actions;

export default playerSlice.reducer;
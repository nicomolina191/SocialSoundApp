import { next, previous, add, remove, set } from "./playerSlice";


export const nextTrack = () => {
    return (dispatch) => {
        dispatch(next());
    };
};

export const previousTrack = () => {
    return (dispatch) => {
        dispatch(previous());
    };
};

export const addTrack = (track) => {
    return (dispatch) => {
        dispatch(add(track))
    };
};

export const removeTrack = (track) => {
    return (dispatch) => {
        dispatch(remove(track))
    };
};

export const setTracks = (tracks) => {
    return (dispatch) => {
        dispatch(set(tracks))
    };
};


import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context';
import { getUserByFirebaseId } from '../../redux/features/users/usersGetSlice';
import SideBar from '../SideBar/SideBar'
import style from './likedSongs.module.css'
import CardSong from './CardSong';
import { getSongsLikesByUserId } from '../../redux/features/like/likeGetSlice';

export default function LikedSongs() {
    const dispatch = useDispatch();
    const userDB = useSelector((state) => state.users.currentUser);
    const likesCurrentUser = useSelector((state) => state.likes.likesSongCurrentUser);
    const { userFirebase } = useAuth();

    useEffect(() => {
        dispatch(getUserByFirebaseId(userFirebase.uid))
    }, []);

    useEffect(() => {
        if (Object.keys(userDB).length > 0) {
            dispatch(getSongsLikesByUserId(userDB.id))
        }
    }, [userDB]) 

    return (
        <Grid container className={style.likedVideos} xs={12}>
            <Grid item container xs={2.5}>
                <SideBar userDB={userDB} />
            </Grid>
            <Grid item container xs={9.5} p={`2%`}>
                {likesCurrentUser?.map((post, index) => <CardSong post={post} index={index} />)}
            </Grid>
        </Grid>
    )
}

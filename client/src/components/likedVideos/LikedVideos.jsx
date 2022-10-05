import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context';
import { getUserByFirebaseId } from '../../redux/features/users/usersGetSlice';
import SideBar from '../SideBar/SideBar'
import style from './likedVideos.module.css'
import CardVideo from './CardVideo';
import { getLikesByUserId } from '../../redux/features/like/likeGetSlice';
import PlayAllButton from "../PlayAllButton/PlayAllButton";

export default function LikedVideos() {
    const dispatch = useDispatch();
    const userDB = useSelector((state) => state.users.currentUser);
    const likesCurrentUser = useSelector((state) => state.likes.likesVideoCurrentUser)
    const { userFirebase } = useAuth();

    useEffect(() => {
        dispatch(getUserByFirebaseId(userFirebase.uid))
    }, []);

    useEffect(() => {
        if (Object.keys(userDB).length > 0) {
            dispatch(getLikesByUserId(userDB.id))
        }
    }, [userDB])

    return (
        <Grid container className={style.likedVideos} xs={12}>
            <Grid item container xs={2.5}>
                <SideBar userDB={userDB} />
            </Grid>
            <Grid item xs={9.5} p={`2%`}>
                <PlayAllButton songs={likesCurrentUser} />
                {likesCurrentUser?.map((post, index) => <CardVideo key={index} post={post} index={index} allPosts={likesCurrentUser} />)}
            </Grid>
        </Grid>
    )
}

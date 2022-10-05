import { Grid } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context';
import { getUserByFirebaseId } from '../../redux/features/users/usersGetSlice';
import SideBar from '../SideBar/SideBar'
import style from './likedVideos.module.css'
import styles from '../ProfilePage/Popular.module.css'
import CardVideo from './CardVideo';
import { getLikesByUserId } from '../../redux/features/like/likeGetSlice';
import PlayAllButton from "../PlayAllButton/PlayAllButton";

export default function LikedVideos() {
    const dispatch = useDispatch();
    const userDB = useSelector((state) => state.users.currentUser);
    const likesCurrentUser = useSelector((state) => state.likes.likesVideoCurrentUser)
    // const [likedPosts, setLikedPosts] = useState()
    const { userFirebase } = useAuth();

    useEffect(() => {
        dispatch(getUserByFirebaseId(userFirebase.uid))
    }, []);

    useEffect(() => {
        if (Object.keys(userDB).length > 0) {
            // async function getLikedPosts() {
            //     const res = await axios.get(`/likes/users/${userDB.id}`)
            //     setLikedPosts(res.data.filter(like => like.isActive).map(like => like.post).filter(post => post.type === 'video'))
            // }
            // getLikedPosts()
            dispatch(getLikesByUserId(userDB.id))
        }
    }, [userDB])

    return (
        <Grid container className={style.likedVideos} xs={12}>
            <Grid item container xs={2.5}>
                <SideBar userDB={userDB} />
            </Grid>
            <Grid item container xs={9.5} p={`2%`} style={{height:'10px'}}>
                <PlayAllButton songs={likesCurrentUser}/>
                {likesCurrentUser?.map((post, index) => <CardVideo post={post} index={index} />)}
            </Grid>
        </Grid>
    )
}

import { Grid } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../context'
import { getPostById } from '../../redux/features/post/postGetSlice'
import { getUserByFirebaseId } from '../../redux/features/users/usersGetSlice'
import { Arrow } from '../componentsIcons'
import Post from '../post/Post'
import style from './postContainer.module.css'

export default function PostContainer() {
    const post = useSelector(state => state.posts.post)
    const dispatch = useDispatch()
    const { idPost } = useParams()
    const { userFirebase } = useAuth();

    useEffect(() => {
        dispatch(getUserByFirebaseId(userFirebase.uid))
        dispatch(getPostById(idPost))
        
    }, [])
    console.log();
    return (
        <Grid container className={style.postContainer} p={`2%`} pl={`4%`} pr={`4%`}>
            <Grid item className={style.back}>
                <Link to='/home'>
                    <Arrow />
                </Link>
            </Grid>
            <Grid item xs={12} className={style.divPost}>
                {
                    Object.keys(post).length !== 0 ? <Post post={post} comments={true} margin={0} /> : ''
                }
            </Grid>
        </Grid>
    )
}

import { Grid } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPostById } from '../../redux/features/post/postGetSlice'
import CommentsContainer from '../commentsContainer/CommentsContainer'
import Post from '../post/Post'

export default function PostContainer() {
    const post = useSelector(state => state.posts.post)
    const dispatch = useDispatch()
    const { idPost } = useParams()

    useEffect(() => {
        dispatch(getPostById(idPost))
    }, [])

    return (
        <Grid container>
            <Post post={post && post} comments={true} />
        </Grid>
    )
}

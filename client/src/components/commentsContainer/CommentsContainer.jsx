import { Button, Grid, Input, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUserNotification } from '../../redux/features/users/usersGetSlice'
import Comment from '../comment/Comment'
import style from './commentsContainer.module.css'

export default function CommentsContainer({ post }) {
    const currentUser = useSelector(state => state.users.currentUser)
    const [comment, setComment] = useState('')
    const [comments, setComments]=useState()
    const dispatch = useDispatch();


    const notification = async() => {
        if(currentUser.id !== post.userId){
          await dispatch(createUserNotification({
              title: JSON.stringify({
                name:`${currentUser.username} commented on your post`,
                img: currentUser.avatar,
                post: post.title,
              }),
              content: `/home/post/${post.id}`,
              userId: post.userId,
              fromUser: currentUser.id,
          }));
            console.log("notification created!")
        }};
   console.log(post.id);
    const handleComment = async () => {
        if (comment) {
            await axios.post('/comments', { content: comment, idPost: post.id, idUser: currentUser.id })
            setComment('')
        }
        
        await getComments()
        await notification()
    }

    async function getComments() {
        const res = await axios.get(`/comments/${post.id}`)
        console.log(res.data);
        setComments(res.data)
    }

    useEffect(() => {
        getComments()
    }, [])

    return (
        <Grid container direction="column" alignSelf="center" className={style.commentsContainer}>
            <Grid item container>
                <TextField placeholder="Add a comment..." variant="outlined" size="small" value={comment} className={style.input} onChange={(e) => setComment(e.target.value)} />
                <Button variant="contained" onClick={handleComment}>Add</Button>
            </Grid>
            <Grid item mt={`2%`}>
                {
                    comments?.length > 0 ?
                        comments.slice(0).reverse().map((comment, i) => <Comment key={i} content={comment.content} userId={comment.userId} commentId={comment.id} getComments={async () => await getComments()} currentUser={currentUser} post={post} />)
                        :
                        ''
                }
            </Grid>
        </Grid>
    )
}

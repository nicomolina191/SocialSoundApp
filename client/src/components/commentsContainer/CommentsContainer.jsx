import { Button, Grid, Input, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Comment from '../comment/Comment'
import style from './commentsContainer.module.css'

export default function CommentsContainer({ idPost }) {
    const currentUser = useSelector(state => state.users.currentUser)
    const [comment, setComment] = useState('')

    const handleComment = async () => {
        if (comment) {
            await axios.post('/comments',{content:comment, idPost, idUser: currentUser.id})
            setComment('')
        }
    }

    const comments = [{ content: 'prueba', postId: idPost, userId: currentUser.id }, { content: 'pruebita', postId: idPost, userId: 'ff586dbe-5cd2-401a-acba-71cc376102e0' }, { content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', postId: idPost, userId: 'ff586dbe-5cd2-401a-acba-71cc376102e0' }]

    return (
        <Grid container direction="column" alignSelf="center" className={style.commentsContainer}>
            <Grid item container>
                <TextField placeholder="Add a comment..." variant="outlined" size="small" value={comment} className={style.input} onChange={(e) => setComment(e.target.value)} />
                <Button variant="contained" onClick={handleComment}>Add</Button>
            </Grid>
            <Grid item mt={`2%`}>
                {
                    comments.length > 0 ?
                        comments.slice(0).reverse().map((comment, i) => <Comment key={i} content={comment.content} userId={comment.userId} />)
                        :
                        ''
                }
            </Grid>
        </Grid>
    )
}

import { Avatar, Button, Dialog, DialogActions, Grid, Slide, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import style from './comment.module.css'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Comment({ content, userId, commentId, getComments, currentUser, post }) {
    const [user, setUser] = useState()
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function getUser() {
            const res = await axios.get(`/users/${userId}`)
            setUser(res.data)
        }
        getUser()
    }, [])


    return (
        <Grid container item p={`1%`} pb={`1.5%`} className={style.comment}>
            <Grid item>
                <Avatar src={user && user.avatar} sx={{ width: 24, height: 24 }} />
            </Grid>
            <Grid item ml={`3%`} style={{ width: '85%' }}>
                <Typography>{content}</Typography>
            </Grid>
            <Grid item className={style.buttonContainer}>
                {
                    currentUser.role === 'Admin' || currentUser.id === userId || post.userId === currentUser.id ? <Button className={style.button} style={{ minWidth: `50%` }} variant="contained" onClick={handleClickOpen}>X</Button> : ''
                }
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                    className={style.dialog}
                    PaperProps={{
                        style: {
                            backgroundColor: "#000A1F",
                            color: "#1976FA",
                            padding: "1%",
                        },
                    }}
                >
                    <h2>Are you sure you want to delete this comment?</h2>
                    <DialogActions>
                        <Button onClick={handleClose} className={style.button}>
                            Close
                        </Button>
                        <Button onClick={async () => {
                            handleClose()
                            await axios.delete(`/comments/${commentId}`)
                            await getComments()
                        }} className={style.button}>
                            Accept
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
    )
}

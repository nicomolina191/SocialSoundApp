import { Avatar, Button, Dialog, DialogActions, Grid, Slide, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { deletePost } from '../redux/features/post/postGetSlice';
import style from '../components/post/post.module.css'
import style2 from './postShared.module.css'
import Post from '../components/post/Post';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PostShared({ postShared, margin }) {
    const [openDelete, setOpenDelete] = useState(false);
    const [user, setUser] = useState();
    const [post, setPost] = useState();
    const [date, setDate] = useState();
    const currentUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    useEffect(() => {
        async function getUser() {
            const res = await axios.get(`/users/${postShared.userId}`);
            setUser(res.data);
        }
        async function getPost() {
            const res = await axios.get(`/posts/${postShared.idPostShared}`)
            setPost(res.data)
        }
        getUser();
        getPost();
    }, []);

    useEffect(() => {
        setDate(new Date(Date.parse(postShared.postDate)).toLocaleString("sv"));
    }, [postShared]);

    return (
        <Grid container direction="column" className={style.post} p={`1.5%`} m={margin}>
            <Grid item container spacing={1} justifyContent="space-between">
                <Grid item container spacing={2} className={style.avatarName}>
                    <Grid item>
                        <Link to={`/home/explore/${postShared.userId}`}>
                            <Avatar src={user && user.avatar} sx={{ "&:hover": { filter: "brightness(70%)", }, }} />
                        </Link>
                    </Grid>
                    <Grid item container xs={4} direction="column">
                        <Link to={`/home/explore/${postShared.userId}`}>
                            <Typography sx={{ "&:hover": { color: "white", cursor: "pointer", }, }} variant="body1">
                                {user && user.name}
                            </Typography>
                        </Link>
                        <Link to={`/home/explore/${postShared.userId}`}>
                            <Typography sx={{ "&:hover": { cursor: "pointer", textDecoration: "underline" }, }} variant="body2">
                                {user && `@${user.username}`}
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item container justifyContent="center" alignItems="center" className={style.buttonContainer}>
                    {
                        currentUser.role === 'Admin' || currentUser.id === postShared.userId ? <Button className={style.button} style={{ minWidth: `50%` }} variant="contained" onClick={handleClickOpenDelete}>X</Button> : ''
                    }
                    <Dialog
                        open={openDelete}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCloseDelete}
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
                        <h2>Are you sure you want to delete this post?</h2>
                        <DialogActions>
                            <Button onClick={handleCloseDelete} className={style.button}>
                                Cancel
                            </Button>
                            <Button onClick={() => {
                                handleCloseDelete()
                                dispatch(deletePost(postShared.id))
                            }} className={style.button}>
                                Accept
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
            <Grid item>
                <Typography variant="h6">{postShared.title}</Typography>
                <Typography variant="body1">{postShared.description}</Typography>
            </Grid>
            <Link to={`/home/post/${post?.id}`}>
                <Grid item className={`${style2.postShared}`}>
                    {post ? <Post post={post} border={{ border: '1px solid #02b599' }} /> : ''}
                </Grid>
            </Link>
            <Grid item>
                <Typography variant="body2">
                    {date &&
                        `${date.split(" ")[1].split(":")[0]}:${date.split(" ")[1].split(":")[1]
                        } · ${monthNames[parseInt(date.split(" ")[0].split("-")[1]) - 1]
                        } ${date.split(" ")[0].split("-")[2]}, ${date.split(" ")[0].split("-")[0]
                        }`}
                </Typography>
            </Grid>
        </Grid>
    )
}

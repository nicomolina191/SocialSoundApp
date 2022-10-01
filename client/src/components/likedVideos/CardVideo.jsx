import { Button, Dialog, DialogActions, DialogContent, Slide, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import LikeButton from '../post/LikeButton';
import Post from '../post/Post';
import styles from '../ProfilePage/Popular.module.css'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CardVideo({ post, index }) {
    const [user, setUser] = useState()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function getUser() {
            const res = await axios.get(`/users/${post.userId}`);
            setUser(res.data);
        }
        getUser();
    }, [])

    return (
        <div className={styles.containerSong} style={{ height: '50px' }}>
            <div className={styles.songFirstHalf}>
                <div className={styles.songFirstHalfIndex}>
                    <p>{index + 1}</p>
                </div>
                <button onClick={handleClickOpen}>
                    <img src={post.cover} alt="" style={{height:'40px', borderRadius:'6px'}} />
                </button>
                <button style={{ width: '20px', fontWeight: '600', color: 'white', fontSize: '18px' }} onClick={handleClickOpen}>
                    <p style={{ cursor: "pointer" }}>{post.title}</p>
                </button>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                    PaperProps={{
                        style: {
                            backgroundColor: "#011f40",
                            color: "#1976FA",
                            padding: "1%",
                        },
                    }}
                    maxWidth={'lg'}
                    fullWidth={true}>
                    {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
                    <DialogContent>
                        {/* <DialogContentText id="alert-dialog-slide-description">
                            Let Google help apps determine location. This means sending anonymous
                            location data to Google, even when no apps are running.
                        </DialogContentText> */}
                        <Post post={post} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        {/* <Button onClick={handleClose}>Agree</Button> */}
                    </DialogActions>
                </Dialog>
            </div>
            <div className={styles.songSecondHalf}>
                <Link to={`/home/explore/${post.userId}`}>
                    <Typography sx={{ "&:hover": { color: "white", cursor: "pointer", }, color: '#C4C4C4' }} variant="body1">
                        {user && user.name}
                    </Typography>
                </Link>
                <LikeButton post={post} />
            </div>
        </div>
    )
}

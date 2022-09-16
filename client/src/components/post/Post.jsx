import React from 'react'
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ReactPlayer from 'react-player';
// import video from '../../video.mp4';
import style from './post.module.css'

export default function Post({post}) {
    return (
        <Grid container direction="column" xs={6} className={style.post}>
            <Grid item container spacing={1}>
                <Grid item>
                    <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                </Grid>
                <Grid item container xs={4} direction="column">
                    <Typography variant='body1'> 
                        Account Name
                    </Typography>
                    <Typography variant='body2'>
                        @Handle
                    </Typography>
                </Grid>
            </Grid>
            <Grid item>
            <Typography variant='h6'>
                    Tittle
                </Typography>
                <Typography variant='body1'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod veniam repellendus rerum, deleniti eligendi nemo repudiandae consequuntur suscipit sequi. Quas id ullam mollitia minus maxime repellat delectus nobis autem odit.
                </Typography>
            </Grid>
            <Grid item className={style.playerWrapper}>
                <ReactPlayer url='https://youtu.be/j0lSpNtjPM8' controls className={style.reactPlayer} width='100%' height='100%' />
            </Grid>
            <Grid item container justifyContent="space-between">
                <Grid item xs>
                    <Typography variant='body2'>
                        11:44 AM - Dec 10, 2022
                    </Typography>
                </Grid>
                <Grid item container xs={4} justifyContent="flex-end" spacing={2}>
                    <Grid item>
                        <button>
                            <FavoriteBorderIcon />
                        </button>
                    </Grid>
                    <Grid item>
                        <button>
                            <ShareIcon />
                        </button>
                    </Grid>
                    <Grid item>
                        <button>
                            <ModeCommentOutlinedIcon />
                        </button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
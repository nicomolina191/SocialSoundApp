import { Grid, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import posts from '../post.json';
import Post from '../post/Post';
import style from './home.module.css'

export default function Home() {
    return (
        <Grid container xs={12} className={style.home}>
            <Grid item container xs={3} direction="column" className={style.sideBar} p={`1%`}>
                <Grid item>
                    <Typography variant='body1' className={style.text}>
                        Home
                    </Typography>
                </Grid>
                <Grid item>
                    <Link to='/home/explore' style={{ textDecoration: 'none' }}>
                        <Typography variant='body1' className={style.text}>
                            Explore
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
            <Grid item xs={9} direction="column" className={style.posts}>
                <Typography variant='h3' className={style.text}>
                    Home.
                </Typography>
                {
                    posts.map(post => <Post post={post} />)
                }
            </Grid>

        </Grid>
    )
}

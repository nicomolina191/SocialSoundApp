import { Avatar, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Comment({ content, userId }) {
    const [user, setUser] = useState()

    useEffect(() => {
        async function getUser() {
            const res = await axios.get(`/users/${userId}`)
            setUser(res.data)
        }
        getUser()
    }, [])


    return (
        <Grid container  item p={`1%`} pb={`1.5%`}>
            <Grid item>
                <Avatar src={user && user.avatar} sx={{ width: 24, height: 24 }} />
            </Grid>
            <Grid item ml={`3%`} style={{width: '85%'}}>
                <Typography>{content}</Typography>
            </Grid>
        </Grid>
    )
}

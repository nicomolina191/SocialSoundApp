import { Avatar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import style from "./reportUsers.module.css"

const ReportUsers = ({data: {title, content, postId, userId, user:{name, email}}}) => {
  return (
    <Box className={style.containerAll}>
        <Box className={style.reporterDiv}>
            <Avatar alt={"d"}/>
            <Link to={userId}><h6>{email}</h6></Link>
            <h1>Reason: {title}</h1>
            <Box className={style.detailContainer}>
            <h3>Detail: {content}</h3>
            </Box>
        </Box>
    </Box>
  )
}

export default ReportUsers
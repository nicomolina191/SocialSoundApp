import { Avatar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import style from "./reportUsers.module.css"

const ReportUsers = ({idUser, idPost }) => {
  return (
    <Box className={style.containerAll}>
        <Box className={style.reporterDiv}>
            <Avatar/><h2>Dawad</h2>
        </Box>
    </Box>
  )
}

export default ReportUsers
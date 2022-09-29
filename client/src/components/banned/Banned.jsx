import { Box } from '@mui/material'
import React from 'react'
import style from "./banned.module.css"

const Banned = () => {
  return (
    <Box className={style.banned}>

        <Box className={style.titleContainer}>
        <h1>You account are banned</h1>
        </Box>

        <Box>
        <h4>Reason:</h4><h1>no reason</h1>
        </Box>

    </Box>
  )
}

export default Banned
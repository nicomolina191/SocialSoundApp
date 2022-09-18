import { Box } from '@mui/system'
import React from 'react'
import Loading from '../loading/Loading'
import style from "../resetPassword/resetPassword.module.css"

const ResetPassword = () => {
  return (
  <Box className={style.containerAll}>
    <Box position={"absolute"} top={"30px"}>
        <Loading width={"200px"} height={"200px"} />
    </Box>
<Box>
    <Box className={style.containerCard}></Box>
</Box>
    </Box>
  )
}

export default ResetPassword
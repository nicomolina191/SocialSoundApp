import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { Arrow } from '../componentsIcons'
import style from "./admin.module.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from '../../redux/features/users/usersGetSlice';
import UsersPerfil from './UsersPerfil';


const Admin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const arrUsers = useSelector(state => state.users.usersListAll)

  const [userSelected, setUserSelected] = useState({})
  

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])
  
  
  return (
    <Box className={style.backgroundAdmin}>
      <Box className={style.containerOptions}>
        <Button sx={{textAlign: "center", backgroundColor: "var(--second-page-color)", borderRadius: "10px"}} fullWidth onClick={() => navigate("/home")}><Arrow/></Button>
      </Box>
      <Box className={style.usersContainer}>
      {arrUsers?.map((u, i)=> <UsersPerfil user={u} key={i}/>)}
      </Box>
    </Box>
  )
}

export default Admin
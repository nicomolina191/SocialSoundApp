import { Avatar, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { Arrow } from '../../componentsIcons'
import style from "./admin.module.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from '../../../redux/features/users/usersGetSlice';
import UsersPerfil from './UsersPerfil';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import axios from 'axios'

const AdminUsers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const arrUsers = useSelector(state => state.users.usersListAll)

  const [loading, setLoading] = useState(false)
  const [userSelected, setUserSelected] = useState({})
  //componente con dos opciones para intercalar entre usuarios y reportes
  //buscar los post por titulo del post nombre del que lo subio y el usuario que lo reporto
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch, userSelected])

  useEffect(() =>  {
    axios.put(`/users/admin/${userSelected.idgoogle}`,{
      ...userSelected
    })
    dispatch(getUser())
    setLoading(false)
  }, [userSelected])
  
  
const formatResult = (user) => <UsersPerfil user={user} setUserSelected={setUserSelected}/>

const handleRole = () => {
  setLoading(true)
  if(userSelected?.role === "Admin") setUserSelected({...userSelected, role:"User"})
  else if(userSelected?.role === "User") setUserSelected({...userSelected, role:"Admin"})
}
const handleBan = () => {
  setLoading(true)
  if(userSelected?.isBanned) setUserSelected({...userSelected, isBanned: false})
  else if(!userSelected?.isBanned) setUserSelected({...userSelected,isBanned: true})
}

const handlePremium = () => {
  setLoading(true)
  if(userSelected?.isPremium) setUserSelected({...userSelected, isPremium: false})
  else if(!userSelected?.isPremium) setUserSelected({...userSelected, isPremium: true})
}

//modal para verificar el baneo handleBan y handleRole usarlos para mostrar el modal, Se cambia el valor al traer todos los usuarios

  return (
    <Box className={style.backgroundAdmin}>
      <Box className={style.containerOptions}>
        <Button className={style.arrow} sx={{textAlign: "center", backgroundColor: "var(--second-page-color)", borderRadius: "10px"}} onClick={() => navigate("/admin")}><Arrow/></Button>
        <Box className={style.userSelectedDiv}>
          {userSelected?.avatar && <Avatar src={userSelected?.avatar} />}

      {userSelected?.name && <h4 style={{paddingTop: "10px"}}>{userSelected?.name}</h4>}

      {userSelected?.name && <Button onClick={() => handleRole()} sx={{textTransform: "none"}} 
      className={style.buttonUser} name={"role"} disable={`${loading}`}>Role: {userSelected?.role}</Button>}

      {userSelected?.name && <Button onClick={() => handleBan()} sx={{textTransform: "none"}} 
      className={style.buttonUser} name={"isBanned"} disable={`${loading}`}>Banned: {userSelected?.isBanned ? "Yes": "No"}</Button>}
      
      {userSelected?.name && <Button onClick={() => handlePremium()} sx={{textTransform: "none"}} 
      className={style.buttonUser} name={"isPremium"} disable={`${loading}`}>IsPremium: {userSelected?.isPremium ? "Yes": "No"}</Button>}
        </Box>
      </Box>
      <Box className={style.usersContainer}>
      <ReactSearchAutocomplete 
       items={arrUsers}
       fuseOptions={{ keys: ["name"] }}
       autoFocus
       formatResult={(e) => formatResult(e)}
       styling={{backgroundColor:"var(--main-page-color)", color: "white", border: "1px solid var(--second-page-color)"}}
       className={style.reactSearchAutocomplete}
       onSelect={(e)=> setUserSelected(e)}
       />
      </Box>
    </Box>
  )
}

export default AdminUsers
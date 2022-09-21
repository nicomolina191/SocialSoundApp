import { Avatar, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import style from "./admin.module.css"

const UsersPerfil = ({user}) => {
    const [colorUser, setColorUser] = useState("gray")
    useEffect(() => {
        if(user.role === "Admin") return setColorUser("var(--second-page-color)")
        if(user.isBanned) return setColorUser("red")
        if(user.plan === "Premium") return setColorUser("yellow")
        if(user.isActive) return setColorUser("white")
    }, [user])
    

    console.log(user)
  return (
  <Button sx={{color:colorUser, padding: "0"}}>
    <div className={style.userDiv}>
        <Avatar alt={user.name} src={user.avatar} />
        <h4>{user.name}</h4>
    </div>
    </Button>
  )
}

export default UsersPerfil
//import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext, useAuth } from '../context'
import style from "../css/register.module.css"
import { Box, TextField } from '@mui/material'
import {EmailIcon, PadLock, UserIcon} from "./componentsIcons/index"
import logo from "../images/logo.png"

const Register = () => {
    const [user, setUser] = useState({name: "", email: "", username: "", password: "", confirmPassword: ""})
    const [errors, setErrors] = useState({name: "", email: "", username: "", password: "", confirmPassword: ""})
    const [equal, setEqual] = useState(false)
    const { signup, signupWithGoogle } = useAuth()
    
    const navigate = useNavigate()

    const handleSignUpGoogle= async()=>{
    try{
      await signupWithGoogle()
    }catch(err){
      console.log(err)
      return
    }
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!user.name || !user.email || !user.username || !user.password || !user.confirmPassword) {
          for (const key in user) {
            if (!user[key]) {
              setErrors({...errors, [key]: `${key} most have a value` });
            }
          }
        return
        } 
        setErrors({name: "", email: "", username: "", password: "", confirmPassword: ""})

        try{
        await signup(user.email, user.password)
        /* axios.post('/users', {
            ...user
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          }); */
          navigate("/login")
        }catch(err){
            console.log(err)
          }

    }
       
    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value})
        /* 
        Estado [usuarios]: [usuarios.some(u => RegExp.test(u))]
        */
    }

  return (
    <div className={style.divBackground}>
      
      <div className={style.containerRegisterDiv}>
      <div className={style.divBackground}>
        <h1 style={{fontSize: "5em", padding: "50px"}}>
          Welcome,<br />
          the best is <br/>
          yet to come.
          </h1>
      </div>
      <div className={style.registerContainer}>
        <div>
          <h1>Sign up</h1>
        <h4>if you already have an account you can <Link to="/login">Login here !</Link></h4>

        <form onSubmit={(e) => handleSubmit(e)}> 

         <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <UserIcon />
        <TextField  variant="standard"  label="Name" name='name'
         onChange={(e) =>handleChange(e)} value={user.name}/>
          </Box >   

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <EmailIcon />
        <TextField label="Email" name='email'
         onChange={(e) =>handleChange(e)} value={user.email}/>
        </Box >
        
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <UserIcon />
        <TextField  variant="standard"  label="Username" name='username'
         onChange={(e) =>handleChange(e)} value={user.username}/>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <PadLock/>
        <TextField className='sfas' variant="standard"  label="Password" name='password' 
        onChange={(e) =>handleChange(e)} value={user.password}/>
        </Box >

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <PadLock/>
        <TextField variant="standard"  color="primary"  label="ConfirmPassword" name='confirmPassword' onChange={(e) =>handleChange(e)} value={user.confirmPassword}/>
        </Box >
        
        <button type='submit'>Register</button>
        </form>
        <button onClick={() => handleSignUpGoogle()}>Register with Google</button>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Register
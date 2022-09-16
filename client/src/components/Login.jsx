import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context'

const Login = () => {
  const [user, setUser] = useState({password: "", email: ""})
  const [error, setError] = useState({password: "", email: ""})
  const { login } = useAuth()
  const navigate = useNavigate()

const handleSubmit = async (e) =>{
  e.preventDefault()
  if(!user.password || !user.email){
    return
  }
  try{
    await login(user.email, user.password)
    navigate("/home")
  }catch(err){
    console.log(err)
  }

}

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
}
  return (
    <div style={{backgroundColor: "black", height: "100vh", width: "100vw", color: "white", display: "flex"}}>
    <div style={{backgroundColor: "gray", height: "100%", width: "50%", color: "white"}} />
    <div style={{backgroundColor: "black", height: "100%", width: "50%", color: "white"}}>

      <h1>Sign up</h1>
      <h4>If you don’t have an account you can <Link to="/register">Register here !</Link></h4>

      <form onSubmit={(e) => handleSubmit(e)}> 

      <div >
      <label htmlFor="email">Email</label>
      <input type="email" name='email'  id='email' onChange={(e) =>handleChange(e)} value={user.email}/>
      </div>

      <div >
      <label  htmlFor="password">Password</label>
      <input  type="password" name='password'  id='password' onChange={(e) =>handleChange(e)} value={user.password}/>
      </div>
      
      <button type='submit'>Login</button>
      </form>
      </div>

  </div>
  )
}

export default Login
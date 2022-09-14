import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context'
import style from "../css/register.module.css"

const Register = () => {
    const [user, setUser] = useState({name: "", email: "", username: "", password: "", confirmPassword: ""})
    const [errors, setErrors] = useState({name: "", email: "", username: "", password: "", confirmPassword: ""})
    const [equal, setEqual] = useState(false)
    const { signup } = useAuth()
    const handleSubmit = async(e) => {
        e.preventDefault()

        if(!user.name || !user.email || !user.username || !user.password || !user.confirmPassword) {
          for (const key in user) {
            console.log(!user[key], key, errors, user);
            if (!user[key]) {
              setErrors({...errors, [key]: `${key} most have a value` });
            }
          }
        return
        } 
        setErrors({name: "", email: "", username: "", password: "", confirmPassword: ""})

        try{
        await signup(user.email, user.password)
        axios.post('/users', {
            ...user
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
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
    <div>
      
      <div className={style.containerRegisterDiv}>
        <div className={style.arrow} />
      <div className={style.divBackground}>
        <h1 style={{fontSize: "5em", padding: "50px"}}>
          Welcome,<br />
          the best is <br/>
          yet to come.
          </h1>
      </div>
      <div className={style.registerContainer}>
      <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.49414 0.676483H15.5059C16.3297 0.676483 17 1.34675 17 2.17062V10.8294C17 11.6533 16.3297 12.3235 15.5059 12.3235H1.49414C0.670271 12.3235 0 11.6533 0 10.8294V2.17062C0 1.34675 0.670271 0.676483 1.49414 0.676483ZM1.68914 1.67258L1.88856 1.83863L7.90719 6.85034C8.25071 7.13635 8.74936 7.13635 9.09281 6.85034L15.1114 1.83863L15.3109 1.67258H1.68914ZM16.0039 2.39169L11.1001 6.47511L16.0039 9.73875V2.39169ZM1.49414 11.3274H15.5059C15.7465 11.3274 15.9478 11.1559 15.9939 10.9286L10.3014 7.14014L9.73018 7.6158C9.37377 7.91257 8.93685 8.06096 8.49997 8.06096C8.06308 8.06096 7.62619 7.91257 7.26976 7.6158L6.69853 7.14014L1.00605 10.9286C1.05221 11.1559 1.25348 11.3274 1.49414 11.3274ZM0.996094 9.73875L5.89993 6.47514L0.996094 2.39169V9.73875Z" fill="white"/>
</svg>
        <h1>Sign up</h1>
        <h4>if you already have an account you can <Link to="/login">Login here !</Link></h4>

        <form onSubmit={(e) => handleSubmit(e)}> 

         <div>
          <label  htmlFor="name">Name</label>
        <input name='name' onChange={(e) =>handleChange(e)} id='name' value={user.name}/>
          </div>   

        <div>
        <label  htmlFor="email">Email</label>
        <input  type="email" name='email' onChange={(e) =>handleChange(e)} id='email' value={user.email}/>
        </div>

        <div>
        <label  htmlFor="username">Username</label>
        <input  name='username' onChange={(e) =>handleChange(e)} id='username' value={user.username}/>
        </div>

        <div>
        <label  htmlFor="password">Password</label>
        <input  type="password" name='password' onChange={(e) =>handleChange(e)} id='password' value={user.password}/>
        </div>

        <div>
        <label  htmlFor="confirmPassword">ConfirmPassword</label>
        <input  type="password" name='confirmPassword' onChange={(e) =>handleChange(e)} id='confirmPassword' value={user.confirmPassword}/>
        </div>
        
        <button type='submit'>Register</button>
        </form>
        </div>
</div>
    </div>
  )
}

export default Register
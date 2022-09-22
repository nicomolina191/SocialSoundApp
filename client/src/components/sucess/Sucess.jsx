import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { getUserUpdatePremium } from '../../redux/features/users/usersGetSlice';
import style from './index.module.css'

const Sucess = () => {

   const dispatch = useDispatch();
   const user = useSelector((state)=> state.users.currentUser)
  
   useEffect(()=>{
     if(user){
       dispatch(getUserUpdatePremium(user.id))
     }
   },[dispatch]);


  return (
     <div className={style.container}>
      <h1>Thanks for your order, you are user Premium!</h1>
       <h2>Go home to enjoy the new features!</h2> 
      <div className={style.divHome}>
      <Link to={'/home'}>Home</Link>
      </div>
    </div>
  )
}

export default Sucess;
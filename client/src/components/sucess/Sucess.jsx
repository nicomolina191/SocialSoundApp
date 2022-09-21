import React from 'react'
import { Link } from 'react-router-dom'
import style from './index.module.css'

const Sucess = () => {
  return (
     <div className={style.container}>
      <h1>Thanks for your order, you are user Premium!</h1>
       <h2>Go home to enjoy the new features!</h2> 
      <div className={style.divHome}>
         <Link to={'/home'}> Home </Link>
      </div>
    </div>
  )
}

export default Sucess;
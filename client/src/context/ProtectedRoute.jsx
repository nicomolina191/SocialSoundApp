import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/'

const ProtectedRoute = ({children}) => {
  const {user} = useAuth()
  if(!user) return <Navigate to="/register" />
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute
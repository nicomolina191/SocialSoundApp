import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';

const Logout = () => {
  const navigate = useNavigate();

  const { logout } = useAuth(); 

  return (
    <button
    onClick={() => {
      logout();
      navigate("/login");
    }}
  >
   Logout
  </button> 
  )
}

export default Logout
{
  /* 
import { useAuth } from '../../context';

  esto va en el componente en donde va el Logout
  const { userFirebase } = useAuth(); 

    useEffect(()=>{
        if (!userFirebase) navigate("/login");
    })
*/
}

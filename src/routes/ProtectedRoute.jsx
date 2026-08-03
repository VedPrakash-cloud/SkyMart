import React, { useContext } from 'react'
import { Navigate } from 'react-router';
import { MyLoginStore } from '../context/AppStore';

const ProtectedRoute = ({children}) => {
    const {currentUser} = useContext(MyLoginStore)

    if(!currentUser){
      return <Navigate to={"/login"} replace/>
    }
  return children;
}

export default ProtectedRoute;

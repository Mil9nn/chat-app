import React from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const { authUser } = useAuthStore();
    
    if(!authUser) return <Navigate to="/login" />
    
    return children
}

export default ProtectedRoute

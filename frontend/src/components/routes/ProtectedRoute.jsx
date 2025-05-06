import React from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { Loader2 } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const { authUser, isCheckingAuth } = useAuthStore();

    if(authUser === null) return <div>Loading...</div>

    if(!authUser) return <Navigate to="/login" />

  return children
}

export default ProtectedRoute

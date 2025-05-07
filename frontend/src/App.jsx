import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import HomeLayout from './layouts/HomeLayout'

import SignupPage from './auth/SignupPage'
import LoginPage from './auth/LoginPage'

import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore'
import { Loader2 } from 'lucide-react'

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  // Show loader only during initial check
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route element={authUser ? <HomeLayout /> : <Navigate to="/login" />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </>
  )
}

export default App
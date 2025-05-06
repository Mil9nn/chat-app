import React from 'react'
import { User, Settings, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';

export default function Navbar() {
  
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and text */}
          <Link to="/" className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo placeholder */}
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">Chatty</span>
            </div>
          </Link>
          
          {/* Right side - Desktop navigation */}
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="p-2 rounded-md text-gray-600 hover:bg-gray-100 flex items-center">
              <User size={20} />
              <span className="hidden sm:inline ml-1">Profile</span>
            </Link>
            <Link to="/settings" className="p-2 rounded-md text-gray-600 hover:bg-gray-100 flex items-center">
              <Settings size={20} />
              <span className="hidden sm:inline ml-1">Settings</span>
            </Link>
            <button onClick={() => {logout(navigate)}} className="p-2 rounded-md text-gray-600 hover:bg-gray-100 flex items-center cursor-pointer">
              <LogOut size={20} />
              <span className="hidden sm:inline ml-1">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
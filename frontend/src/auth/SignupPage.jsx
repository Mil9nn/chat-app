import React, { useState } from 'react';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuthStore } from '../store/useAuthStore';


export default function Signup() {
  const navigate = useNavigate();

  const { signup, isSigningUp } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.fullName.trim().length < 3) return toast.error('Full Name must be at least 3 characters long.');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return toast.error('Please enter a valid email address');
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters long');

    signup(formData, navigate);

  }

  return (
    <>
      {/* Preload Logo */}
      <link
        rel="preload"
        as="image"
        href="https://res.cloudinary.com/dkt1t22qc/image/upload/v1742348949/Prestataires_Documents/smj7n1bdlpjsfsotwpco.png"
      />

      <div
        className="bg-cover bg-gradient-to-br from-[#7337FF] via-black to-[#0C7EA8]"
        style={{
          backgroundImage:
            'url(/authBg.jpg)',
        }}
      >
        <div className="h-screen flex justify-center items-center backdrop-brightness-50">
          <div className="flex flex-col items-center space-y-8">
            {/* Logo */}
            <img
              src="https://res.cloudinary.com/dkt1t22qc/image/upload/v1742348949/Prestataires_Documents/smj7n1bdlpjsfsotwpco.png"
              alt="TyBot Logo"
              className="cursor-pointer w-20"
            />

            {/* Signup Card */}
            <form onSubmit={handleFormSubmit} className="rounded-2xl w-80 p-8 bg-[#310D84] shadow-xl shadow-black/50">
              <h1 className="text-white text-3xl font-bold mb-4">Sign Up</h1>

              <div className="space-y-4">
                {/* Username */}
                <label className="flex items-center bg-[#8777BA] rounded-md shadow-md shadow-blue-950 px-3">
                  <User className="text-gray-300" size={18} />
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => { setFormData({ ...formData, fullName: e.target.value }) }}
                    value={formData.fullName}
                    className="w-full p-2.5 placeholder:text-gray-300 outline-none"
                  />
                </label>

                {/* Email */}
                <div className="flex items-center bg-[#8777BA] rounded-md shadow-md shadow-blue-950 px-3">
                  <Mail className="text-gray-300" size={18} />
                  <input
                    type="text"
                    placeholder="Email address"
                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                    value={formData.email}
                    className="bg-transparent w-full p-2.5 placeholder:text-gray-300 outline-none"
                  />
                </div>

                {/* Password */}
                <div className="flex items-center bg-[#8777BA] rounded-md shadow-md shadow-blue-950 px-3">
                  <Lock className="text-gray-300" size={18} />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
                    value={formData.password}
                    className="bg-transparent w-full p-2.5 placeholder:text-gray-300 outline-none"
                  />
                </div>
              </div>

              {/* Sign Up Button */}
              <button type="submit" className="w-full h-10 mt-6 text-white rounded-md bg-gradient-to-br from-[#7336FF] to-[#3269FF] shadow-md shadow-blue-950">
                {isSigningUp ? (<div className="flex items-center justify-center">
                  <Loader2 className="animate-spin" />
                </div>)
                  : (<span>Create Account</span>)}
              </button>

              {/* Already have an account */}
              <Link to="/login" className="text-gray-300 text-center text-sm mt-4">
                Already have an account?{' '}
                <span className="text-[#228CE0] cursor-pointer hover:underline">
                  Sign in
                </span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
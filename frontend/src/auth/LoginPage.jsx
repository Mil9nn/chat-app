import React, { useState } from 'react';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoggingIn, checkAuth } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return toast.error('Please enter a valid email address');
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters long');

    await login(formData);
    await checkAuth();
    navigate('/');
  }

  return (
    <div className="h-screen flex justify-center items-center backdrop-brightness-50">
      <div className="flex flex-col items-center space-y-8">
        <form onSubmit={handleLoginSubmit} className="card w-80 p-8 bg-base-100 shadow-xl">

          <div className="absolute top-0 right-0 w-16 h-16 bg-base-300 rounded-2xl flex items-center justify-center">
            <img className="w-12 h-12" src="/logo.png" alt="logo" />
          </div>

          <h1 className="text-3xl font-bold text-base-content mb-6 text-center">Login</h1>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Email address</span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full pr-10"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                value={formData.email}
              />
              <Mail className="absolute right-3 top-3 text-base-content/60" size={18} />
            </div>
          </div>

          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered w-full pr-10"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                value={formData.password}
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-base-content/60"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <div className="text-right text-sm text-primary/70 font-medium hover:underline cursor-pointer mb-4">
            Forgot Password?
          </div>

          <button type="submit" className="btn btn-primary w-full">
            {isLoggingIn ? <Loader2 className="animate-spin" /> : 'Log In'}
          </button>

          <div className="text-center text-sm mt-4">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

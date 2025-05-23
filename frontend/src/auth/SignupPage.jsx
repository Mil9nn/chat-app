import React, { useState } from 'react';
import { Mail, Lock, User, Loader2, Bot, Eye, EyeOff } from 'lucide-react';
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

  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formData.fullName.trim().length < 3) return toast.error('Full Name must be at least 3 characters long.');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return toast.error('Please enter a valid email address');
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters long');

    signup(formData, navigate);
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center backdrop-brightness-50">
        <div className="flex flex-col items-center space-y-6">

          <form
            onSubmit={handleFormSubmit}
            className="card w-80 bg-base-200 shadow-xl p-8 space-y-4">

            <div className="absolute top-0 right-0 w-16 h-16 bg-base-300 rounded-2xl flex items-center justify-center">
              <img className="w-12 h-12" src="/logo.png" alt="logo" />
            </div>

            <h2 className="text-2xl font-bold text-center">Create Account</h2>

            {/* Full Name */}
            <label className="input input-bordered flex items-center gap-2">
              <User className="text-base-content" size={18} />
              <input
                type="text"
                placeholder="Full Name"
                className="grow"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </label>

            {/* Email */}
            <label className="input input-bordered flex items-center gap-2">
              <Mail className="text-base-content" size={18} />
              <input
                type="email"
                placeholder="Email Address"
                className="grow"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </label>

            {/* Password */}
            <label className="input input-bordered flex items-center gap-2">
              <Lock className="text-base-content" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="grow"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="text-base-content"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </label>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                'Create Account'
              )}
            </button>

            {/* Already have an account */}
            <p className="text-center text-sm text-base-content">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: false });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data, navigate) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            if (res.status === 201) {
                toast.success("User account created successfully!");
                return navigate('/');
            }
        } catch (error) {
            toast.error(error.response.data.message || "Signup failed. Please try again.");
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('/auth/login', data);
            if (res.status === 200) {
               return toast.success("Logged in successfully!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async (navigate) => {
        try {
            const res = await axiosInstance.post("/auth/logout");
            if (res.status === 200) {
                set({ authUser: null });
                toast.success("Logged out successfully");
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (imageUrl) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put('/auth/update-profile', { profilePic: imageUrl });
            if (res.status === 200) {
                return toast.success("Profile updated successfully!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Profile update failed. Please try again.");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

}));
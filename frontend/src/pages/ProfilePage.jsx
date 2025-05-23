import { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const ProfilePage = () => {
  
  const fileInputRef = useRef();

  const [selectedImg, setSelectedImg] = useState(null);
  const { updateProfile, isUpdatingProfile, authUser } = useAuthStore();

  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setSelectedImg(reader.result);
      updateProfile(reader.result);
    };
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>

      {/* Profile Image */}
      <div className="relative w-28 h-28 mx-auto">
        <img
          src={selectedImg || authUser?.profilePic || "/user.svg"}
          alt="Profile"
          className="w-full h-full rounded-full border-4 border-base-300 object-cover"
        />
        <button
          onClick={handleProfilePicClick}
          className="absolute bottom-1 right-1 bg-base-300 cursor-pointer text-base-content hover:bg-base-200 hover:text-primary transition-colors p-1.5 rounded-full">
          <Camera className={isUpdatingProfile ? "animate-pulse" : ""} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {isUpdatingProfile ? <p className="text-sm text-base-content/40 text-center mt-2">We're updating your profile. please wait...</p> : <p className="text-sm text-base-content/40 text-center mt-2">
        Please click the camera icon to upload
      </p>}

      {/* User Info */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-base-content/70">
          Information
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium text-base-content/60">Name:</span>
            <span className="text-base-content/90">{authUser?.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-base-content/60">Email:</span>
            <span className="text-base-content/90">{authUser?.email}</span>
          </div>
        </div>
      </div>

      {/* Other Info */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-base-content/70">
          Other Information
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium text-base-content/60">Created At:</span>
            <span className="text-base-content/90">{authUser?.createdAt.split('T')[0]}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-base-content/60">Account Status:</span>
            <span className="text-green-600 font-semibold">Active</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-base-content/60">User Role:</span>
            <span className="text-base-content/90">Standard</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
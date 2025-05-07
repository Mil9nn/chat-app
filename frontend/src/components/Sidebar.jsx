import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from '../skeletons/SidebarSkeleton'
import { Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function ContactsSidebar() {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const [hideSidebar, setHideSidebar] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const isSmallScreen = window.innerWidth <= 640;

    if(selectedUser && isSmallScreen) {
    setHideSidebar(true);
  } else {
    setHideSidebar(false);
  };
  }, [selectedUser])

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  if (isUsersLoading) return <SidebarSkeleton />

  // online status logic
  const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;

  return (
    <aside className={`w-[25vw] ${hideSidebar ? "absolute -left-64" : "relative"} shadow-md py-3`}>
      {/* Header */}
      <header className="flex flex-col justify-center gap-3 border-b border-base-200 w-full p-4">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-gray-600" />
          <span className="font-medium hidden lg:block text-gray-800">
            Contacts
          </span>
        </div>
        <label className="flex sm:flex-row flex-col items-center gap-2 mb-4 pl-3 text-sm cursor-pointer">
          <input
            type="checkbox"
            className="accent-blue-500 cursor-pointer"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
          />
          Show online users only
        </label>
      </header>

      <ul className="h-[72vh] overflow-y-auto">
        {filteredUsers.map((user) => (
          <li onClick={() => { setSelectedUser(user) }} key={user._id} className={`flex p-4 pl-5 items-center gap-3 transition-all cursor-pointer
          ${selectedUser?._id === user?._id ? "bg-base-200" : ""}`}>
            <div className="relative w-10 h-10">
              <img
                src={user.profilePic || '/user.svg'}
                alt={user.fullName}
                className="w-full h-full rounded-full object-cover"
              />
              {onlineUsers.includes(user._id) && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-base-100 rounded-full" />}
            </div>
            <span className="font-medium md:inline hidden">{user.fullName}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
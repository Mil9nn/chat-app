import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from '../skeletons/SidebarSkeleton';
import { Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import NoOnlineUsers from './NoOnlineUsers';

export default function ContactsSidebar() {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [hideSidebar, setHideSidebar] = useState(false);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const isSmallScreen = window.innerWidth <= 640;
    setHideSidebar(selectedUser && isSmallScreen);
  }, [selectedUser]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className={`w-[25vw] max-w-[300px] bg-base-100 border-r-1 border-base-300 ${hideSidebar ? "absolute -left-64" : "relative"} shadow-md transition-all`}>
      {/* Header */}
      <header className="flex flex-col gap-4 bg-base-300 p-4 pb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-base-content" />
          <span className="font-semibold text-base-content hidden sm:inline">Contacts</span>
        </div>
        <label className="flex flex-col sm:flex-row items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="toggle toggle-sm"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
          />
          <span className="text-sm">Show online only</span>
        </label>
        <span className="text-xs text-zinc-500">{onlineUsers.length - 1} online</span>
      </header>

      {/* Users List */}
      <ul className="h-[72vh] overflow-y-auto custom-scrollbar px-2 py-2 space-y-1">
        {filteredUsers.map((user) => (
          <li
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200
            ${selectedUser?._id === user._id ? "bg-base-200" : "hover:bg-base-100"}`}
          >
            <div className="relative w-10 h-10">
              <img
                src={user.profilePic || '/user.svg'}
                alt={user.fullName}
                className="w-full h-full rounded-full object-cover"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-base-100 rounded-full" />
              )}
            </div>
            <span className="font-medium hidden md:inline text-base-content">{user.fullName}</span>
          </li>
        ))}

        {filteredUsers.length === 0 && <NoOnlineUsers />}
      </ul>
    </aside>
  );
}
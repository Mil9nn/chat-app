import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { X } from 'lucide-react';

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();

    if(selectedUser) {return (
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#00000033]">
            <div className="flex items-center gap-2">
                <div className="relative w-10 h-10">
                    <img
                        src={selectedUser?.profilePic || '/user.svg'}
                        alt="User"
                        className="w-full h-full rounded-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <span className="font-medium">{selectedUser?.fullName}</span>
            </div>
            <button onClick={() => {setSelectedUser(null)}} className="text-gray-500 hover:text-red-400 transition cursor-pointer">
                <X className="w-5 h-5" />
            </button>
        </div>
    )}
}

export default ChatHeader

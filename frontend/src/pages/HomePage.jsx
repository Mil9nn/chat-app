import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import { useChatStore } from '../store/useChatStore'
import NoChatSelected from '../components/NoChatSelected'

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="flex h-[calc(100vh - 65px)]">
      <Sidebar />
      {selectedUser ? <ChatContainer /> : <NoChatSelected />}
    </div>
  )
}

export default HomePage

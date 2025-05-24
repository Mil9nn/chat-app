import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from './MessageInput'
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import formatTime from "../utils/FormatTime";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser,
    subscribeToMessages, unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {

    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader />

      <div className="h-[calc(100vh-192px)] overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isSender = message.senderId === authUser._id;
          return (
            <div key={message._id} ref={messageEndRef}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
              {/* Avatar and message container */}
              <div className="flex items-start space-x-2 max-w-xs sm:max-w-md">
                {!isSender && (
                  <div className="w-10 h-10 rounded-full overflow-hidden border shrink-0">
                    <img
                      src={selectedUser.profilePic || "/user.svg"}
                      alt="profile pic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <div className="mb-1 text-xs text-base-content/60">
                    <time>{formatTime(new Date(message.createdAt).toLocaleTimeString())}</time>
                  </div>

                  <div
                    className={`rounded-lg p-2 text-sm ${isSender
                      ? "bg-base-300 text-base-content"
                      : "bg-base-200 text-base-content"
                      }`}>
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="rounded-md mb-2 max-w-[200px]"
                      />
                    )}
                    {message.text && <p className="break-words max-w-[16rem] sm:max-w-[20rem]">{message.text}</p>
}
                  </div>
                </div>

                {isSender && (
                  <div className="w-10 h-10 rounded-full overflow-hidden border shrink-0">
                    <img
                      src={authUser.profilePic || "/user.svg"}
                      alt="profile pic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
import React, { useRef, useState } from 'react';
import { Send, Image, X, XCircle } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import toast from 'react-hot-toast';

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage, selectedUser, isSendingMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });

            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    if (selectedUser) {
        return (
            <form onSubmit={handleSendMessage} className="border-t border-[#00000033] p-3 flex items-center gap-2">
                {imagePreview && (
                    <div className="mb-3 flex items-center gap-2">
                        <div className="relative">
                            <img
                                src={imagePreview || '/user.svg'}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-lg border border-text-base/80"
                            />
                            <button
                                onClick={removeImage}
                                className="absolute top-[-5px] right-[-4px] w-5 h-5 z-5 bg-white rounded-full bg-base-300
                            flex items-center justify-center cursor-pointer"
                                type="button"
                                aria-label="Remove image"
                            >
                                <XCircle className="size-6" />
                            </button>
                        </div>
                    </div>
                )}

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-gray-500 hover:text-blue-600 transition cursor-pointer"
                    aria-label="Upload image"
                >
                    <Image className="w-5 h-5" />
                </button>

                <input
                    type="text"
                    placeholder="Type your message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
                <button
                    disabled={(!text.trim() && !imagePreview) || isSendingMessage}
                    type="submit"
                    className="bg-primary hover:scale-[1.04] transition-all ease-in-out text-base-100 cursor-pointer px-4 py-2 rounded-full text-sm flex items-center gap-1"
                    aria-label="Send message"
                >
                    <Send className="w-4 h-4" />
                    Send
                </button>
            </form>
        );
    }
};

export default MessageInput;

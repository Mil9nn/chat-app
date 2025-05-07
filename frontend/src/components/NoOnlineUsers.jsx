import { UserX } from 'lucide-react'
import React from 'react'

const NoOnlineUsers = () => {
    return (
        <div className="w-[25vw] h-full bg-gray-100 dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="p-6 rounded-full bg-gray-200 dark:bg-gray-700 mb-4">
                    <UserX className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                    No one's online
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                    When users come online, they'll appear here
                </p>
            </div>
        </div>
    )
}

export default NoOnlineUsers

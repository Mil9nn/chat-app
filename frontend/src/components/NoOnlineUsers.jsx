import { UserX } from 'lucide-react'
import React from 'react'

const NoOnlineUsers = () => {
    return (
        <div className="h-full bg-base-100 p-4 border-r border-base-100">
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="p-6 rounded-full bg-gray-200 dark:bg-gray-700 mb-4">
                    <UserX className="sm:w-8 sm:h-8 w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-base-content/50 dark:text-gray-300 mb-1">
                    No one's online
                </h3>
                <p className="text-sm hidden sm:block text-gray-500 dark:text-gray-400 max-w-xs">
                    When users come online, they'll appear here
                </p>
            </div>
        </div>
    )
}

export default NoOnlineUsers

/**
 * LiveComments.tsx
 * Displays real-time comments with username, message, and timestamp.
 * Allows deletion for the current logged-in user.
 */

'use client'

import { Feedback } from '@/types'

interface Props {
  comments: Feedback[]
  currentUserId: string | null
  onDelete: (id: string) => Promise<void>
}

export default function LiveComments({ comments, currentUserId, onDelete }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-5">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        💬 Live Comments
      </h2>

      {comments.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-12">
          No comments yet. Be the first to share your thoughts!
        </div>
      ) : (
        <div className="space-y-4 max-h-[340px] overflow-y-auto pr-2 scroll-smooth">
          {comments.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700"
            >
              {/* Avatar */}
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold shadow">
                {item.username?.charAt(0)?.toUpperCase() || '?'}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {item.username}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(item.inserted_at).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-gray-700 dark:text-gray-300 break-words">
                  {item.comment}
                </p>
                {item.user_id === currentUserId && (
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-sm text-red-500 hover:underline mt-1"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

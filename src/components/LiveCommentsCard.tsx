/**
 * LiveCommentsCard.tsx
 * This component displays real-time comments submitted by users.
 * It renders a scrollable list styled with Tailwind, showing name, comment, and timestamp.
 */

import { Feedback } from "@/types";

export default function LiveCommentsCard({ comments }: { comments: Feedback[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">💬 Live Comments</h2>
      {comments.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-center py-8">
          No comments yet. Be the first to share your thoughts!
        </div>
      ) : (
        <div className="space-y-4 max-h-[340px] overflow-y-auto pr-2">
          {comments.map((item) => (
            <div key={item.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold shadow-sm">
                {item.username[0]?.toUpperCase() || "?"}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 dark:text-white">{item.username}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(item.inserted_at).toLocaleString()}</span>
                </div>
                <p className="mt-1 text-gray-700 dark:text-gray-300">{item.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
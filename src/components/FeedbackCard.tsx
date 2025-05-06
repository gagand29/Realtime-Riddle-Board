/**
 * FeedbackCard.tsx
 * Standalone card to submit a single comment. Useful when used inside a loop for multiple characters.
 */

import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { FeedbackCard as FeedbackCardType } from "@/types";

export function FeedbackCard({ onSubmit }: Omit<FeedbackCardType, "id" | "text">) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex flex-col justify-between min-h-[220px]">
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write something..."
          className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-base min-h-[90px]"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FiSend className="text-lg" />
          <span>Submit</span>
        </button>
      </form>
    </div>
  );
}
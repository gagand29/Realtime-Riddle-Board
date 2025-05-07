/**
 * UserCard.tsx
 * Displays the current user avatar and emoji.
 * Includes reusable feedback input form with username and comment.
 */

'use client'

import { useState } from 'react'
import { FiUser } from 'react-icons/fi'
import { UserCard as UserCardType } from '@/types'

const EMOJIS = ['😊', '🎮', '🌟', '🎯', '🎨', '🎭', '🎪', '🎲']

/**
 * Utility to get a random emoji.
 */
export function getRandomEmoji() {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
}

/**
 * Card showing the current user and emoji.
 */
export function UserCard({ username, emoji }: Omit<UserCardType, 'id'>) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow flex items-center gap-4 px-4 py-3">
      <span className="text-3xl select-none">{emoji}</span>
      <div className="flex items-center gap-2">
        <FiUser className="text-blue-500 text-xl" />
        <span className="font-semibold text-lg text-gray-900 dark:text-white">
          {username}
        </span>
      </div>
    </div>
  )
}

/**
 * Form to submit feedback with username + comment.
 */
export default function UserFeedbackForm({
  onSubmit,
}: {
  onSubmit: (user: string, text: string) => void
}) {
  const [text, setText] = useState('')
  const [username, setUsername] = useState('')

  const handleSend = () => {
    if (!username.trim() || !text.trim()) return
    onSubmit(username.trim(), text.trim())
    setText('')
  }

  return (
    <div className="space-y-3 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md">
      <input
        type="text"
        placeholder="Your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Write your comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[90px]"
      />
      <button
        onClick={handleSend}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold shadow transition-all"
      >
        Send
      </button>
    </div>
  )
}

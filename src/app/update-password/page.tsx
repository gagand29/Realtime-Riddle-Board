'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleUpdate = async () => {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Password updated! Redirecting...')
      setTimeout(() => router.push('/login'), 2000)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Set New Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full p-3 border rounded-md mb-3 dark:bg-gray-700 dark:text-white"
      />
      <button
        onClick={handleUpdate}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Update Password
      </button>
      {message && <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{message}</p>}
    </div>
  )
}

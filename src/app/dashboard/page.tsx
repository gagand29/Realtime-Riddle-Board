'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Feedback } from '@/types'
import LiveCommentsCard from '@/components/LiveComments'
import { getRandomEmoji } from '@/components/UserCard'

const DashboardPage = () => {
  const router = useRouter()
  const [sessionUserId, setSessionUserId] = useState<string | null>(null)
  const [sessionUserName, setSessionUserName] = useState<string>('')
  const [liveComments, setLiveComments] = useState<Feedback[]>([])
  const [comment, setComment] = useState('')
  const [emoji] = useState(getRandomEmoji())

  // 🔐 Auth Session Check
  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession()
      const user = data.session?.user
      if (!user) {
        router.push('/login')
        return
      }
      setSessionUserId(user.id)
      setSessionUserName(
        user.user_metadata?.name || user.email?.split('@')[0] || 'Anonymous'
      )
    }
    loadSession()
  }, [router])

  // 📡 Load + Realtime Subscription
  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await supabase
        .from('feedback')
        .select('*')
        .order('inserted_at', { ascending: false })
      setLiveComments(data || [])
    }
    fetchComments()

    const channel = supabase
      .channel('realtime:feedback')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'feedback'
        },
        (payload) => {
          setLiveComments((prev) => [payload.new as Feedback, ...prev])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // ✉️ Submit Comment
  const handleSubmitFeedback = async () => {
    if (!comment.trim() || !sessionUserId) return

    const { error } = await supabase
      .from('feedback')
      .insert([
        {
          username: sessionUserName,
          comment,
          user_id: sessionUserId
        }
      ])
      .select('*')

    if (!error) setComment('')
  }

  // 🗑️ Delete Comment (only own)
  const handleDelete = async (id: string) => {
    await supabase.from('feedback').delete().eq('id', id)
  }

  // 🚪 Logout
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">⚡ Live Feedback</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Prompt Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">🤔 Riddle of the Day</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            What comes once in a minute, twice in a moment, but never in a thousand years?
          </p>
          <textarea
            placeholder="Type your answer here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none
              focus:ring-2 focus:ring-blue-500 focus:outline-none
              bg-white text-gray-800 dark:bg-gray-700 dark:text-white
              placeholder:text-gray-400 dark:placeholder:text-gray-500 mb-4"
          />
          <button
            onClick={handleSubmitFeedback}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
          >
            Submit Answer
          </button>
        </div>

        {/* Comments Section */}
        <LiveCommentsCard
          comments={liveComments}
          currentUserId={sessionUserId}
          onDelete={handleDelete}
        />
      </div>
    </main>
  )
}

export default DashboardPage

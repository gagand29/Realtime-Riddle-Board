import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Live Feedback App',
  description: 'Vote in real time on characters',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start p-6">
        <h1 className="text-2xl font-bold my-6">⚡ Live Feedback</h1>
        {children}
      </body>
    </html>
  )
}

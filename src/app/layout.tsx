import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Realtime Riddle Board',
  description: 'Submit answers and see real-time feedback with Supabase Auth and Realtime DB',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start p-6">
        <header className="text-center space-y-2 mb-6">
          <h1 className="text-3xl font-bold">⚡ Realtime Riddle Board</h1>
          <p className="text-sm text-gray-400 max-w-md">
            A fun mini project using <strong>Supabase Auth</strong> and <strong>Realtime PostgreSQL</strong> to collect answers from users and broadcast them instantly.
          </p>
        </header>
        {children}
      </body>
    </html>
  )
}

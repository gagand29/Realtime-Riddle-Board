import { characters } from '@/lib/test'

export default function AdminPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">📊 Live Feedback Summary</h2>
      {characters.map(c => (
        <div key={c.id}>
          <strong>{c.name}</strong> — 👍 {c.feedback.good} 😐 {c.feedback.okay} 👎 {c.feedback.bad}
        </div>
      ))}
    </div>
  )
}

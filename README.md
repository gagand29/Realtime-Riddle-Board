# ⚡ Supabase Realtime Riddle Board

https://pitch.com/v/realtime-riddle-board-4qhdnk

A minimal full-stack app built with **Next.js** and **Supabase** to explore:

- 🔐 OAuth & Email Auth via Supabase
- 🧠 A fun riddle-based prompt system
- 💬 Realtime PostgreSQL + live comment updates
- 🚪 Password reset flow
- ✨ MVP-ready UI using TailwindCSS

---

## 🌐 Live Demo

Coming soon...

--

## 🧠 Why This Project?

I wanted to explore **Supabase as a backend replacement** for:
- Auth (Google + Email)
- Realtime updates (with `on('INSERT')`)
- Secure user data with Row Level Security (RLS)

The goal: **Build a working MVP in < 1 day** and learn best practices for fast-moving full-stack apps.

---

## ⚙️ Features

- ✅ Login with Email/Password or Google
- ✅ Add answers to a daily riddle
- ✅ View all comments live (no refresh!)
- ✅ Only the comment author can delete their own comment
- ✅ Forgot password flow using Supabase reset link
- 🔐 Protected dashboard route

---

## 🔧 Stack Used

- **Next.js 14 App Router**
- **Supabase (auth + DB + real-time)**
- **TailwindCSS** for UI styling
- **TypeScript**




---

## 🛠 Future Improvements

- 🔁 Add comment editing
- 🛡️ Add roles (moderator/admin)
- 🧾 Connect custom SMTP for production email
- 🔑 Enable MFA via Supabase
- 🧪 Add tests (Playwright, Unit)

---

## 🚀 Running Locally

```bash
git clone https://github.com/gagand29/Realtime-Riddle-Board.git
cd supabase-realtime-riddle-board
npm install
npm run dev

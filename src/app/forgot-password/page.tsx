"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    setMessage(
      error ? error.message : "✅ Check your email to reset your password."
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen flex justify-center bg-gray-900 px-4 pt-8">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-xl shadow space-y-4">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            ⚡ Live Feedback
          </h1>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
            placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
        >
          Send Reset Link
        </button>

        {message && (
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}

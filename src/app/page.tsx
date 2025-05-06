'use client';

import { useEffect, useState } from "react";
import HeaderCard from "@/components/HeaderCard";
import LiveCommentsCard from "@/components/LiveCommentsCard";
import { supabase } from "@/lib/supabase";
import { Feedback } from "@/types";
import { getRandomEmoji } from "@/components/UserCard";

// Strictly typed feedback targets
const SAMPLE_NAMES = ["abc", "xyz", "foo"] as const;
type CharacterKey = typeof SAMPLE_NAMES[number];

export default function Home() {
  const [liveComments, setLiveComments] = useState<Feedback[]>([]);
  const [username, setUsername] = useState("");
  const [emoji, setEmoji] = useState(getRandomEmoji());

  // Feedback inputs per character box
  const [inputs, setInputs] = useState<Record<CharacterKey, string>>({
    abc: "",
    xyz: "",
    foo: "",
  });

  // Fetch all comments on load and subscribe to realtime changes
  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await supabase
        .from("feedback")
        .select("*")
        .order("inserted_at", { ascending: false });
      setLiveComments(data || []);
    };
    fetchComments();

    const channel = supabase
      .channel("realtime:feedback")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "feedback" },
        (payload) => {
          setLiveComments((prev) => [payload.new as Feedback, ...prev]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // Submit handler
  const handleSubmitFeedback = async (name: CharacterKey) => {
    const comment = inputs[name];
    if (!comment.trim()) return;

    const { error } = await supabase.from("feedback").insert([
      { username: name, comment },
    ]);
    if (!error) {
      setInputs((prev) => ({ ...prev, [name]: "" }));
    } else {
      console.error("Supabase insert error:", error.message);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Header with Admin Link */}
        <HeaderCard />

        {/* Grid with Name Entry & Feedback Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
          {/* Welcome Card */}
          <div className="col-span-1 bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Welcome!</h2>
            <p className="text-gray-500 dark:text-gray-300 mb-3">Type your name to get started.</p>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setEmoji(getRandomEmoji());
              }}
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white mb-2"
            />
            {username && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl">{emoji}</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {username}
                </span>
              </div>
            )}
          </div>

          {/* Feedback Boxes */}
          <div className="col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SAMPLE_NAMES.map((name) => (
              <div
                key={name}
                className="bg-white dark:bg-gray-800 border rounded-lg p-5 flex flex-col justify-between shadow-sm"
              >
                <h3 className="text-center text-gray-700 dark:text-gray-200 font-semibold text-lg mb-3">
                  {name}
                </h3>
                <textarea
  placeholder="Write something..."
  value={inputs[name]}
  onChange={(e) =>
    setInputs((prev) => ({ ...prev, [name]: e.target.value }))
  }
  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none
             focus:ring-2 focus:ring-blue-500 focus:border-transparent
             bg-white text-gray-800 dark:bg-gray-700 dark:text-white 
             placeholder:text-gray-400 dark:placeholder:text-gray-500 mb-3"
/>
                <button
                  onClick={() => handleSubmitFeedback(name)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-all duration-200"
                >
                  Submit
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Comments Section */}
        <LiveCommentsCard comments={liveComments} />
      </div>
    </main>
  );
}

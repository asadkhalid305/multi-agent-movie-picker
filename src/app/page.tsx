"use client";

import { useState, useEffect } from "react";
import type { RecommendResponse, RecommendItem } from "@/types/api";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState<RecommendResponse | null>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    setIsDark(theme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResponse(data);
    } catch (err) {
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#202020] py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-[#2D2D2D] hover:bg-gray-200 dark:hover:bg-[#3A3A3A] transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg
                className="w-5 h-5 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Movie & Show Picker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tell us what you&apos;re looking for, and we&apos;ll recommend
            something great.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="bg-white dark:bg-[#2D2D2D] rounded-xl border border-gray-200 dark:border-[#3A3A3A] p-6 transition-colors">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
            >
              What are you in the mood for?
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1A1A] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-white focus:border-gray-800 dark:focus:border-white text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
              placeholder="E.g., I have a 1 hour flight, want something light and funny..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="mt-4 w-full bg-gray-800 dark:bg-white text-white dark:text-black py-3 px-4 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 disabled:bg-gray-400 dark:disabled:bg-gray-600 dark:disabled:text-white disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? "Recommending..." : "Recommend"}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl p-4 mb-8">
            <p className="text-red-800 dark:text-red-400">{error}</p>
          </div>
        )}

        {response && (
          <div className="bg-white dark:bg-[#2D2D2D] rounded-xl border border-gray-200 dark:border-[#3A3A3A] p-6 transition-colors">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {response.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              <span className="font-medium">You said:</span> &quot;
              {response.echo}&quot;
            </p>

            <div className="space-y-4">
              {response.items.map((item: RecommendItem, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-[#3A3A3A] bg-gray-50 dark:bg-[#1A1A1A] rounded-lg p-4 hover:border-gray-300 dark:hover:border-[#4A4A4A] transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {item.name}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    {item.why}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.type === "movie"
                      ? `${item.durationMinutes} minutes`
                      : `${item.episodeDurationMinutes} min per episode`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

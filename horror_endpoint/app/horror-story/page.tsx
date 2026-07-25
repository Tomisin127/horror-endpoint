'use client';

import { useEffect, useState } from 'react';

interface Story {
  id: number;
  title: string;
  excerpt: string;
}

interface ApiResponse {
  title: string;
  stories: Story[];
  timestamp: string;
}

export default function HorrorStoryPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentRequired, setPaymentRequired] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/api/horror-story', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 402) {
          setPaymentRequired(true);
          setError(null);
        } else if (response.ok) {
          const result = await response.json();
          setData(result);
          setPaymentRequired(false);
        } else {
          setError(`Error: ${response.statusText}`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stories');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-red-500">Horror Stories</h1>

        {loading && (
          <div className="text-center py-12">
            <p className="text-slate-400">Loading stories...</p>
          </div>
        )}

        {paymentRequired && (
          <div className="bg-amber-900 border border-amber-700 rounded-lg p-6 mb-6">
            <p className="text-amber-100 font-semibold">Payment Required</p>
            <p className="text-amber-200 text-sm mt-2">
              This content requires payment via x402. Submit payment to unlock these stories.
            </p>
          </div>
        )}

        {error && !paymentRequired && (
          <div className="bg-red-900 border border-red-700 rounded-lg p-4 text-red-100">
            {error}
          </div>
        )}

        {data && (
          <div className="space-y-6">
            {data.stories.map((story) => (
              <article
                key={story.id}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-red-500 transition-colors"
              >
                <h2 className="text-2xl font-semibold text-red-400 mb-2">
                  {story.title}
                </h2>
                <p className="text-slate-300 leading-relaxed">{story.excerpt}</p>
              </article>
            ))}
            <p className="text-xs text-slate-500 mt-8">
              Last updated: {new Date(data.timestamp).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

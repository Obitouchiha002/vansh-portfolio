import { useState, useEffect } from 'react';

export default function YouTubeStats() {
  // Default fallback values (447 subscribers, 264.0K views)
  const [stats, setStats] = useState({
    subscribers: "447",
    views: "264.0K"
  });

  useEffect(() => {
    // Try to fetch live data
    fetch('/api/youtube-stats')
      .then(res => {
        if (!res.ok) throw new Error('API not ready or missing key');
        return res.json();
      })
      .then(data => {
        if (data && data.subscribers && data.views) {
          const subsNum = parseInt(data.subscribers);
          const viewsNum = parseInt(data.views);
          
          // Format views (e.g., 264000 -> 264.0K)
          let viewsFormatted = viewsNum.toLocaleString();
          if (viewsNum >= 1000) {
            viewsFormatted = (viewsNum / 1000).toFixed(1) + 'K';
          }

          setStats({
            subscribers: subsNum.toLocaleString(),
            views: viewsFormatted
          });
        }
      })
      .catch(err => {
        console.log("Using fallback YouTube stats because API is not configured yet.");
      });
  }, []);

  return (
    <div className="flex gap-8 p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <div>
        <p className="text-zinc-400 text-sm uppercase tracking-wider">SUBSCRIBERS</p>
        <p className="text-2xl font-bold text-white">{stats.subscribers}</p>
      </div>
      <div>
        <p className="text-zinc-400 text-sm uppercase tracking-wider">TOTAL VIEWS</p>
        <p className="text-2xl font-bold text-white">{stats.views}</p>
      </div>
    </div>
  );
}

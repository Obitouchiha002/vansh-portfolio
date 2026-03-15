import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE || "@techbyvansh";

  if (!apiKey) {
    return res.status(500).json({ error: "YOUTUBE_API_KEY not configured" });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=${handle}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const stats = data.items[0].statistics;
      res.json({
        subscribers: stats.subscriberCount,
        views: stats.viewCount,
        videoCount: stats.videoCount,
      });
    } else {
      res.status(404).json({ error: "Channel not found" });
    }
  } catch (error) {
    console.error("YouTube API Error:", error);
    res.status(500).json({ error: "Failed to fetch YouTube stats" });
  }
}

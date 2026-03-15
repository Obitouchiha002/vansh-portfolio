import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import archiver from "archiver";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API route to download source code
  app.get("/api/download-source", (req, res) => {
    res.attachment("portfolio-source-code.zip");
    
    const archive = archiver("zip", {
      zlib: { level: 9 } // Sets the compression level.
    });

    archive.on("error", (err) => {
      res.status(500).send({ error: err.message });
    });

    archive.pipe(res);

    // Add all files in the current directory, ignoring node_modules, dist, and .git
    archive.glob("**/*", {
      cwd: process.cwd(),
      ignore: ["node_modules/**", "dist/**", ".git/**", ".env*"]
    });
    
    // Also include hidden files like .env.example, .gitignore
    archive.glob(".*", {
      cwd: process.cwd(),
      ignore: ["node_modules/**", "dist/**", ".git/**", ".env", ".env.local", ".env.development", ".env.production"]
    });

    archive.finalize();
  });

  // API route to fetch YouTube stats
  app.get("/api/youtube-stats", async (req, res) => {
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
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

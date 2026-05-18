import "dotenv/config";
import express from "express";
import archiver from "archiver";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Determine __dirname based on whether it is running as CJS (compiled) or ESM (dev)
  const isProduction = process.env.NODE_ENV === "production" || process.env.K_SERVICE !== undefined;
  let currentDir = "";
  
  if (typeof __dirname !== 'undefined') {
    currentDir = __dirname;
  } else {
    // We are in pure ESM dev mode via tsx
    // Dynamic import to avoid CJS compilation error when using __dirname
    const url = await import('url');
    const __filename = url.fileURLToPath(import.meta.url);
    currentDir = path.dirname(__filename);
  }

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

    // Provide root dir mapping correctly depending on if it's dist/ or root
    const rootDir = process.env.NODE_ENV === "production" ? path.join(currentDir, '..') : currentDir;

    // Add all files in the current directory, ignoring node_modules, dist, and .git
    archive.glob("**/*", {
      cwd: rootDir,
      ignore: ["node_modules/**", "dist/**", ".git/**", ".env*"]
    });
    
    // Also include hidden files like .env.example, .gitignore
    archive.glob(".*", {
      cwd: rootDir,
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

  // Vite middleware for development or fallback
  const distPath = process.env.NODE_ENV === "production" ? currentDir : path.join(currentDir, "dist");
  const indexPath = path.join(distPath, "index.html");
  const hasBuild = fs.existsSync(indexPath);
  
  if (!isProduction || !hasBuild) {
    if (isProduction && !hasBuild) {
      console.warn("Warning: index.html is missing in production fallback path. Falling back to Vite dev server.");
    }
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    let indexHtml = "";
    try {
      indexHtml = fs.readFileSync(indexPath, "utf8");
    } catch (e) {
      console.warn("Could not read index.html synchronously", e);
    }
    app.get("*", (req, res) => {
      if (indexHtml) {
        res.setHeader("Content-Type", "text/html");
        res.send(indexHtml);
      } else {
        res.sendFile(indexPath);
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

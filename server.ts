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
      ignore: ["node_modules/**", "dist/**", ".git/**"]
    });
    
    // Also include hidden files like .env.example, .gitignore
    archive.glob(".*", {
      cwd: process.cwd(),
      ignore: ["node_modules/**", "dist/**", ".git/**"]
    });

    archive.finalize();
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

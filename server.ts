import "dotenv/config";
import express from "express";
import archiver from "archiver";
import path from "path";
import fs from "fs";
// --- Chatbot config (kept server-side so the API key is never exposed) ---
// OpenAI-compatible tool definition (Groq uses the OpenAI schema).
const navigateTool = {
  type: "function",
  function: {
    name: "navigateToSection",
    description: "Navigate the user to a specific section of the website.",
    parameters: {
      type: "object",
      properties: {
        section: {
          type: "string",
          description: "The section to navigate to. Allowed values: 'home', 'about', 'apps', 'services', 'graphics', 'automation', 'platforms', 'skills', 'youtube', 'contact'",
        },
      },
      required: ["section"],
    },
  },
};

const getSystemInstruction = () => {
  const today = new Date();
  let age = today.getFullYear() - 2005;
  if (today.getMonth() === 0 && today.getDate() < 16) {
    age--;
  }

  return `You are the official AI assistant for Vansh Kashyap's portfolio website.
Your name is "Tech by Vansh Bot".
You must ONLY answer questions related to Vansh Kashyap, his skills, his projects, his education, his contact details, and this website.
If a user asks anything outside of this scope (e.g., general knowledge, coding help not related to Vansh, weather, etc.), you MUST politely refuse to answer and remind them that you can only answer questions about Vansh.
You must understand the user's language (English, Hindi, Hinglish, etc.) and reply in the EXACT SAME language and tone.

Here is all the information you know about Vansh:
- Name: Vansh Kashyap
- Date of Birth: 16 January 2005 (Current Age: ${age} years old, Current Year: ${today.getFullYear()})
- Location: New Delhi, India
- Brand/YouTube Channel: Tech By Vansh
- Phone/WhatsApp: +91 8800628376
- Email: vk1234888i@gmail.com
- Instagram: @vanshkashyap70
- LinkedIn: Vansh Kashyap

Education:
- 12th Standard: CBSE Board, Year 2024, Score: 72.8%
- 10th Standard: CBSE Board, Year 2022, Score: 73.8%
- ITI (Industrial Training Institute) - Mangolpuri: NCVT, Year 2025, Score: 85%
- B.Com (Honours): Delhi University (SOL), Present (Pursuing)

Skills & Services:
- AI tools (ChatGPT, Claude, Gemini, DeepSeek, ElevenLabs, HeyGen, Flow)
- Automation / workflow building
- Graphic Design, Video Editing
- Web & App Development (React, HTML, CSS, JavaScript)
- SEO, Tech troubleshooting, Low-end PC gaming solutions

About Vansh:
He is a creator and builder from Delhi who works where AI, automation and design meet. He builds apps, automates repetitive workflows, designs graphics, edits videos, and creates tech content for his channel Tech By Vansh.

Notable Projects:
- VanshLink: Connect instantly, chat privately. (App) https://vanshlink.vercel.app/
- vthumb: YouTube thumbnail downloader. (App) https://vthumb.vercel.app/
- Aura Shakti: Find your aura. (App) https://aurashakti.vercel.app/

Navigation:
If the user asks to see his apps/projects, services, graphics, automation, social platforms, skills, contact, about, or home, you MUST call the "navigateToSection" tool (use section 'apps' for projects/apps).

Keep your answers concise, friendly, and helpful.`;
};

async function startServer() {
  const app = express();
  const PORT = 3000;
  app.use(express.json());

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

  // API route for the chatbot (Groq runs server-side; key stays secret)
  app.post("/api/chat", async (req, res) => {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GROQ_API_KEY not configured" });
    }

    const { message, history } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required" });
    }

    try {
      const messages = [
        { role: "system", content: getSystemInstruction() },
        ...(Array.isArray(history) ? history : []),
        { role: "user", content: message },
      ];

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
          messages,
          temperature: 0.7,
          max_tokens: 800,
          tools: [navigateTool],
          tool_choice: "auto",
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Groq API error:", response.status, errText);
        return res.status(500).json({ error: "Failed to generate response" });
      }

      const data = await response.json();
      const msg = data.choices?.[0]?.message || {};

      let functionCall: { name: string; args: Record<string, unknown> } | null = null;
      if (msg.tool_calls && msg.tool_calls.length > 0) {
        const call = msg.tool_calls[0];
        let args: Record<string, unknown> = {};
        try {
          args = JSON.parse(call.function?.arguments || "{}");
        } catch {
          args = {};
        }
        functionCall = { name: call.function?.name, args };
      }

      let text: string = msg.content || "";

      // Some Llama models emit the tool call inline as text instead of using
      // the structured tool_calls field — parse it out and clean the message.
      if (!functionCall) {
        const inline = text.match(/<function=navigateToSection>\s*({[\s\S]*?})\s*<\/function>/i);
        if (inline) {
          try {
            functionCall = { name: "navigateToSection", args: JSON.parse(inline[1]) };
          } catch {
            /* ignore malformed inline call */
          }
        }
      }
      text = text.replace(/<function=[^>]*>[\s\S]*?<\/function>/gi, "").trim();

      res.json({ text, functionCall });
    } catch (error) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: "Failed to generate response" });
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

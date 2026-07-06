import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Mentor API Proxy Route
  app.post("/api/mentor", async (req, res) => {
    try {
      const { message, day, chatHistory } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        return res.json({
          text: "👋 Hello there! I am **Aria, your personal FARM Stack Hackathon Mentor**. \n\nTo unlock my advanced AI capabilities (custom code critiques, real-time debugging, and deep hackathon advice), please configure your **GEMINI_API_KEY** secret in the **Settings > Secrets** panel in the Google AI Studio UI!\n\nIn the meantime, feel free to dive into the interactive 12-day roadmap, play in the live sandboxes, complete lessons, and track your bootcamp progress!"
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const dayContext = day ? `Day ${day}` : "their current learning session";
      const systemInstruction = `You are Aria, an elite Software Architect, Senior Full-Stack Engineer, Hackathon Champion, and warm personal Hackathon Mentor for a 12-day FARM (FastAPI, React, MongoDB) Stack Bootcamp.
Your role is to guide the student from HTML basics to becoming completely hackathon-ready in building full-stack applications.
The user is currently studying ${dayContext}.
Be extremely encouraging, concise, insight-driven, and highly practical. Focus on:
1. High-speed prototyping strategies.
2. Avoiding common developer pitfalls.
3. Clean architectural separation between React state, FastAPI path controllers, and MongoDB collections.
4. Writing production-quality code.
When providing code, always use clear, high-contrast, beautiful Markdown code blocks with specified syntax languages. Ensure your explanations are easy to digest.`;

      // Structure conversations history array
      const formattedContents = [];
      if (chatHistory && Array.isArray(chatHistory)) {
        for (const turn of chatHistory) {
          formattedContents.push({
            role: turn.role === 'user' ? 'user' : 'model',
            parts: [{ text: turn.text }]
          });
        }
      }
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Request Error:", error);
      res.status(500).json({ 
        error: "Failed to connect to your AI Mentor. Please verify that your API key is correctly specified and try again.", 
        details: error.message 
      });
    }
  });

  // Serve static UI assets and handle dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started successfully on http://0.0.0.0:${PORT}`);
  });
}

startServer();

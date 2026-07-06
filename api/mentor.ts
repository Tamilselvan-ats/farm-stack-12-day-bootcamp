import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  // Only accept POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { message, day, chatHistory } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // Check if the API key is set
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
      return res.status(200).json({
        text: "👋 Hello there! I am **Aria, your personal FARM Stack Hackathon Mentor**.\n\nTo unlock my advanced AI capabilities on Vercel, please make sure you add the **GEMINI_API_KEY** environment variable in your **Vercel Project Dashboard under Settings > Environment Variables**!"
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
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
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text }]
        });
      }
    }
    formattedContents.push({
      role: "user",
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

    return res.status(200).json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Vercel Request Error:", error);
    return res.status(500).json({
      error: "Failed to connect to your AI Mentor. Please verify your Vercel GEMINI_API_KEY environment variable.",
      details: error.message
    });
  }
}

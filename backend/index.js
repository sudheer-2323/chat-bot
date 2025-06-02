import express from 'express';
import cors from 'cors'; 
const app = express();
const PORT = process.env.PORT || 3000;
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function main(prompt) {
    try {
    const result = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
        });
        return result.text;
    } catch (error) {
        console.error("Error generating content:", error.message || error);
    }
}

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://chat-bot-iota-smoky.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true
}));





app.get('/ask', async (req, res) => {
  const question = req.query.q || "explain the differences between c and c++";
  console.log(question);
  const answer = await main(question);
  res.send({ question, answer });
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

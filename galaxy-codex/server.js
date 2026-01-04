import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createRequire } from 'module';

dotenv.config();

// Stranger detection & lockdown (CommonJS module)
const require = createRequire(import.meta.url);
const { notifyIfStranger, checkLockdown } = require('/home/admin/shared/notify.js');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

// Cache setup
const CACHE_FILE = 'cache.json';
let cache = {};

async function loadCache() {
  try {
    const data = await fs.readFile(CACHE_FILE, 'utf-8');
    cache = JSON.parse(data);
  } catch (error) {
    cache = {};
  }
}

async function saveCache() {
  await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
}

loadCache();

// Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_API_KEY');
// Text Model
const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" }); // Using Gemini 3 Pro Preview
// Image Model (Nano Banana) - configured per-request with responseModalities

const SYSTEM_PROMPT_TEMPLATE = `
You are the Galaxy Codex, an advanced AI interface for exploring human knowledge.
Your goal is to provide structured, educational content about any topic requested.

Format your response in strictly structured Markdown:

# {TOPIC_PLACEHOLDER}

## Galaxy
Assign this topic to ONE semantic galaxy (a broad knowledge cluster). Choose from existing galaxies or create a new one if needed.
Format: **Galaxy: [Galaxy Name]**
Examples: "Data & Learning", "Neural Architectures", "Mathematics & Theory", "Applications & Tools", "Ethics & Society", "Hardware & Infrastructure"

## Overview
A concise, high-level summary of the topic (2-3 sentences).

## Key Concepts
- **Concept 1**: Definition
- **Concept 2**: Definition
- **Concept 3**: Definition

## Deep Dive
Detailed explanation, history, or technical breakdown. Use subsections if needed.

## Visuals
Create a Mermaid.js diagram (graph TD, sequenceDiagram, or mindmap) illustrating the concept, process, or hierarchy.
Wrap it in a \`\`\`mermaid code block.

## Connections
List 3-5 related topics for further exploration.

## Bridge Galaxies
If this topic connects to other knowledge domains, list them.
Format: **Bridges: [Galaxy1], [Galaxy2]**
Example: "Bridges: Mathematics & Theory, Hardware & Infrastructure"

IMPORTANT:
- Wrap 6-10 key related terms in [[double brackets]] like [[Neural Networks]]
- Use markdown formatting
- STRICTLY use the headers provided above so the UI can split the content correctly.
- ENSURE NEWLINES after headers.
`;

// Streaming endpoint using Server-Sent Events
app.get('/galaxy-api/expand-stream', checkLockdown('galaxy'), async (req, res) => {
  const { topic } = req.query;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  // Alert if stranger is expanding a node
  notifyIfStranger(req, `🌌 Galaxy Codex: Expanding node "${topic}"`);

  // Check cache first
  if (cache[topic] && cache[topic].content) {
    console.log(`Returning cached result for: ${topic}`);
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.write(`data: ${JSON.stringify({ type: 'complete', data: cache[topic] })}\n\n`);
    res.end();
    return;
  }

  // Set up SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // Prevent buffering by proxies

  // Send initial ping to establish connection immediately
  res.write(': ping\n\n');

  try {
    console.log(`Streaming content for: ${topic}`);

    const prompt = SYSTEM_PROMPT_TEMPLATE.replace('{TOPIC_PLACEHOLDER}', topic);

    const result = await model.generateContentStream(prompt);
    let fullText = '';

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
      // Send chunk to client
      res.write(`data: ${JSON.stringify({ type: 'chunk', text: chunkText })}\n\n`);
    }

    // Parse galaxy assignment from content
    const galaxyMatch = fullText.match(/\*\*Galaxy:\s*([^*\n]+)\*\*/i);
    const galaxy = galaxyMatch ? galaxyMatch[1].trim() : 'Core AI';

    // Parse bridge galaxies
    const bridgeMatch = fullText.match(/\*\*Bridges?:\s*([^*\n]+)\*\*/i);
    const bridges = bridgeMatch
      ? bridgeMatch[1].split(',').map(b => b.trim()).filter(Boolean)
      : [];

    // Build final data object
    const data = {
      name: topic,
      galaxy: galaxy,
      bridges: bridges,
      content: fullText
    };

    // Cache text content
    cache[topic] = { ...cache[topic], ...data };
    await saveCache();

    // Send complete signal
    res.write(`data: ${JSON.stringify({ type: 'complete', data })}\n\n`);
    res.end();

  } catch (error) {
    console.error('Gemini API Error:', error);
    res.write(`data: ${JSON.stringify({ type: 'error', message: error.message })}\n\n`);
    res.end();
  }
});

// Image Generation Endpoint
app.get('/galaxy-api/visualize', async (req, res) => {
  const { topic } = req.query;
  if (!topic) return res.status(400).json({ error: 'Topic required' });

  // Check cache
  if (cache[topic] && cache[topic].imageUrl) {
    return res.json({ imageUrl: cache[topic].imageUrl });
  }

  try {
    console.log(`Generating Nano Banana visualization for: ${topic}`);
    const prompt = `Technical diagram or schematic of ${topic}.
        Style: Neon blueprint, cyan/white lines on dark background.
        High contrast, educational, detailed.
        Square aspect ratio (1:1), 512x512 pixels.
        Clean, minimal design suitable for a sci-fi HUD display.`;

    // Use Nano Banana (gemini-3-pro-image-preview) with proper config
    const imageModel = genAI.getGenerativeModel({
      model: "gemini-3-pro-image-preview",
      generationConfig: {
        responseModalities: ["IMAGE"],
      }
    });

    const result = await imageModel.generateContent(prompt);
    const response = await result.response;

    // Assuming response contains image data (this varies by SDK version/model)
    // If we can't get a URL, we might get base64.
    // For now, if this throws, we go to catch.

    // If the SDK returns text instead of image (common with wrong model), throw.
    if (!response.candidates || !response.candidates[0].content.parts[0].inlineData) {
      throw new Error("Model returned text, not image. Check model permissions.");
    }

    const base64Image = response.candidates[0].content.parts[0].inlineData.data;
    const mimeType = response.candidates[0].content.parts[0].inlineData.mimeType;
    const imageUrl = `data:${mimeType};base64,${base64Image}`;

    // Cache it
    if (!cache[topic]) cache[topic] = {};
    cache[topic].imageUrl = imageUrl;
    await saveCache();

    res.json({ imageUrl });

  } catch (error) {
    console.error('Image generation error:', error);
    // Return explicit error to user so they know to check API key
    res.status(500).json({
      error: 'Image Generation Failed',
      details: error.message,
      hint: 'Ensure GEMINI_API_KEY has access to gemini-3-pro-image-preview'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

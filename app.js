const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const { error } = require("console");
const express = require("express");
const path = require('path');
const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let main = async function run(prompt) {
    try {
        const chatSession = model.startChat({
          generationConfig,
          // safetySettings: Adjust safety settings
          // See https://ai.google.dev/gemini-api/docs/safety-settings
          history: [],
        });
      
        const result = await chatSession.sendMessage(prompt);
        return result.response.text();
    } catch (error) {
        console.error('Error in main function:', error);
        throw new Error('Failed to get a response from the AI model.');
    }
};

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/get-response",async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await main(prompt);
    res.json({ answer: response });
  } 
  catch {
    console.error('Error fetching GPT response:', error);
    res.status(500).json({ response: 'Error fetching response.' });
  }
});

app.listen(port, () => {
  console.log(`App runnin at http://localhost:${port}`);
});




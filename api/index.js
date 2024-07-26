import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
const { json } = express;
const app = express();
import MistralClient from "@mistralai/mistralai";
dotenv.config({ path: "../config.env" });

app.use(cors());
app.use(json());

const apiKey = process.env.MISTRAL;

const client = new MistralClient(apiKey);

app.post("/api/summarize", async (req, res) => {
  const text = req.body.content;
  const chatResponse = async () => {
    const res = await client.chat({
      model: "mistral-large-latest",
      messages: [
        {
          role: "user",
          content: "Hi, summarize this text and return only the text." + text,
        },
      ],
    });
    return res.choices[0].message.content;
  };

  const data = await chatResponse();
  res.send(data);
});

app.listen(3000, (req, res) => {
  console.log("Listening on 3000");
});

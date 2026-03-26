// server.js
const express = require("express");
const cors = require("cors");

const { ingestDoc } = require("./ragIngest");
const { ragQuery } = require("./ragQuery");

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());

app.post("/chatbot/create", async (req, res) => {
  try {
    console.log("req.body ", req.body)
    const result = await ingestDoc(req.body);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

app.post("/chatbot/query", async (req, res) => {
  try {
    const result = await ragQuery(req.body);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// module.exports = app;
app.listen(4000, () => console.log("🚀 API on http://localhost:4000"));
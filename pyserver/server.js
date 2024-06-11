const express = require("express");
const axios = require("axios");

const app = express();

const FLASK_API_URL = "http://127.0.0.1:5000/predict";

const text = "It was a bang on average service. Nothing out of the ordinary.";

app.get("/predict", (req, res) => {
  axios
    .get(FLASK_API_URL, {
      params: {
        text: text,
      },
    })
    .then((response) => {
      const data = response.data;
      const sentiment = data.sentiment;
      console.log(`Sentiment for "${text}": ${sentiment}`);
      res.json({
        sentiment: sentiment,
        scores: data.scores,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    });
});

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

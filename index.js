const express = require("express");
const asyncHandler = require("express-async-handler");
const axios = require("axios");
const app = express();
const PORT = 3001;

app.get(
  "/jokes",
  asyncHandler(async (req, res) => {
    const category = req.query.category || "dev";
    const response = await getJoke(category);
    res.json({
      message: response,
    });
  })
);

const getJoke = async (category) => {
  try {
    const response = await axios.get(
      `https://api.chucknorris.io/jokes/random?category=${category}`
    );
    return response.data.value;
  } catch (err) {
    console.log(err);
  }
};

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

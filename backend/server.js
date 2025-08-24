// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy database
const recipes = {
  mood: {
    happy: ["Ice Cream Sundae", "Fruit Salad"],
    sad: ["Chocolate Cake", "Mac & Cheese"],
    energetic: ["Protein Smoothie", "Grilled Chicken"],
    relaxed: ["Herbal Tea", "Pasta Alfredo"]
  },
  weather: {
    sunny: ["Lemonade", "Cold Salad"],
    rainy: ["Hot Soup", "Pakoras"],
    cold: ["Spicy Curry", "Hot Chocolate"],
    hot: ["Iced Tea", "Fruit Smoothie"]
  },
  pantry: {
    rice: ["Fried Rice", "Rice Pudding"],
    bread: ["Garlic Bread", "Sandwich"],
    eggs: ["Omelette", "Egg Curry"],
    potatoes: ["French Fries", "Mashed Potatoes"]
  },
  health: {
    vegan: ["Vegan Salad", "Grilled Tofu"],
    diabetic: ["Sugar-Free Cookies", "Quinoa Bowl"],
    glutenfree: ["Gluten-Free Pasta", "Salad Wrap"],
    keto: ["Avocado Salad", "Grilled Fish"]
  }
};

// Test route
app.get("/", (req, res) => {
  res.send("Foodie Flow Backend is running 🚀");
});

// Dynamic route: /get-recipes
app.post("/get-recipes", (req, res) => {
  const { type, value } = req.body;

  if (!type || !value || !recipes[type] || !recipes[type][value]) {
    return res.status(400).json({ error: "Invalid request" });
  }

  res.json({
    type,
    value,
    recipes: recipes[type][value]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
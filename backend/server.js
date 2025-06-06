const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // To potentially load .env variables if the file were allowed

// Load mock data into memory
let mockRecipes = [];
let alwaysAvailableIngredients = [];

try {
  const recipesData = fs.readFileSync(path.join(__dirname, 'data', 'mockRecipes.json'), 'utf8');
  mockRecipes = JSON.parse(recipesData);
  console.log(`Loaded ${mockRecipes.length} mock recipes.`);
} catch (err) {
  console.error('Error loading mockRecipes.json:', err);
  // Decide if you want to exit or run with empty recipes
}

try {
  const ingredientsData = fs.readFileSync(path.join(__dirname, 'data', 'alwaysAvailableIngredients.json'), 'utf8');
  alwaysAvailableIngredients = JSON.parse(ingredientsData);
  console.log(`Loaded ${alwaysAvailableIngredients.length} always available ingredients.`);
} catch (err) {
  console.error('Error loading alwaysAvailableIngredients.json:', err);
}

// Import routes
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes'); // Will be uncommented/created soon
const menuRoutes = require('./routes/menus');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parses incoming requests with JSON payloads

// Make loaded data available to routes/controllers by attaching to app or exporting
// For simplicity, controllers can require this server.js or a dedicated data module
// Or, more directly, pass them to the router if the router setup allows it.
// For now, the recipeController will require them directly or they will be passed via req object.
app.set('mockRecipes', mockRecipes);
app.set('alwaysAvailableIngredients', alwaysAvailableIngredients);

// Define a simple root route for testing
app.get('/', (req, res) => {
  res.send('Kitchen Navigator Backend is running!');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/menus', menuRoutes);

const PORT = process.env.PORT || 5001; // Default to 5001 if not specified in .env

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // Log loaded data for MVP (optional, for debugging)
  const { users, subscriptions } = require('./db/db.js');
  console.log(`Initial users: ${users.length}, Initial subscriptions: ${subscriptions.length}`);
});

// Export loaded data for controllers to use (alternative to app.set)
module.exports.loadedMockRecipes = mockRecipes;
module.exports.loadedAlwaysAvailableIngredients = alwaysAvailableIngredients; 
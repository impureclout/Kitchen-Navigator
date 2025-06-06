const express = require('express');
const router = express.Router();
const { generateRecipes } = require('../controllers/recipeController.js');
const authMiddleware = require('../middleware/auth.js');

// @route   POST api/recipes/generate
// @desc    Generate recipes based on user ingredients
// @access  Private (requires authentication)
router.post('/generate', authMiddleware, generateRecipes);

module.exports = router; 
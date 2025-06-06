const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
// You will create this controller file in the next step.
const { saveMenu, getSavedMenus, deleteMenu } = require('../controllers/menuController');

// @route   POST api/menus
// @desc    Save a user's created menu
// @access  Private
router.post('/', authMiddleware, saveMenu);

// @route   GET api/menus
// @desc    Get all of a user's saved menus
// @access  Private
router.get('/', authMiddleware, getSavedMenus);

// @route   DELETE api/menus/:id
// @desc    Delete a saved menu
// @access  Private
router.delete('/:id', authMiddleware, deleteMenu);

module.exports = router; 
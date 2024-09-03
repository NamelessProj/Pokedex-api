const express = require('express');
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

// @route Pokemon route (GET)
// @desc Route to get all the pokemon
// @access Public
router.route('/').get(pokemonController.getPokemons);

module.exports = router;
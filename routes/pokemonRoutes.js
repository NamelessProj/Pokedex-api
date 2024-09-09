const express = require('express');
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

// @route Pokemon route (GET)
// @desc Route to get all the pokemon
// @access Public
router.route('/').get(pokemonController.getPokemons);

// @route Pokemon route (GET)
// @desc Route to get a pokemon using his name
// @access Public
router.route('/:name').get(pokemonController.getSinglePokemon);

// @route Pokemon route (POST)
// @desc Route to create a pokemon
// @access Private (admin)
router.route('/').post(pokemonController.createPokemon);

// @route Pokemon route (PUT)
// @desc Route to modified a pokemon
// @access Private (admin)
router.route('/:id').delete(pokemonController.deletePokemon);

// @route Pokemon route (DELETE)
// @desc Route to delete a pokemon
// @access Private (admin)

// @route Pokemon route (GET)
// @desc Route to get a pokemon using his id
// @access Public
router.route('/single/:id').get(pokemonController.getPokemonById);

module.exports = router;
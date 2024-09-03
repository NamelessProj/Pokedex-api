// LIBRARY & MODELS IMPORTS
const asyncHandler = require("express-async-handler");
const PokemonModel = require("../models/pokemonModel");

// @desc Getting all pokemon from the DB
// @route GET /api/pokemon
// @access Public
const getPokemons = asyncHandler(async (req, res) => {
    const pokemons = await PokemonModel.find();
    res.status(200).json(pokemons);
});

module.exports = {
    getPokemons,
}
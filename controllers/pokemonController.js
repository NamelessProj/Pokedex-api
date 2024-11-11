// LIBRARY & MODELS IMPORTS
const asyncHandler = require("express-async-handler");
const PokemonModel = require("../models/pokemonModel");

// @desc Getting all pokemon from the DB
// @route GET /api/pokemon
// @access Public
const getPokemons = asyncHandler(async (req, res) => {
    const pokemons = await PokemonModel.find();
    if(pokemons.length === 0){
        res.status(400);
        throw new Error("We haven't been able to find any pokemon.");
    }
    res.status(200).json(pokemons);
});

// @desc Getting a pokemon from the DB using his name
// @route GET /api/pokemon/name
// @access Public
const getSinglePokemon = asyncHandler(async (req, res) => {
    const pokemon = await PokemonModel.findOne({pokemon_name: req.params.name});
    if(pokemon.length === 0){
        res.status(400);
        throw new Error("We haven't been able to find any pokemon.");
    }
    res.status(200).json(pokemon);
});

// @desc Getting a pokemon from the DB using his id
// @route GET /api/pokemon/single/:id
// @access Public
const getPokemonById = asyncHandler(async (req, res) => {
    const pokemon = await PokemonModel.findById(req.params.id);
    if(pokemon.length === 0){
        res.status(400);
        throw new Error("We haven't been able to find any pokemon.");
    }
    res.status(200).json(pokemon);
});

// @desc Create a pokemon into the DB
// @route POST /api/pokemon
// @access Private (admin)
const createPokemon = asyncHandler(async (req, res) => {
    // Getting all input
    const inputs = req.body;

    // Check if the form is filled correctly
    if(!inputs || !inputs.pokemon_name || !inputs.pokemon_num){
        res.status(400);
        throw new Error("Thanks to fill all the required fields.");
    }

    // Check the pokemon doesn't exist yet
    const pokemonExists = await PokemonModel.findOne({pokemon_name: inputs.pokemon_name});
    if(pokemonExists){
        res.status(400);
        throw new Error("The pokemon already exist.");
    }

    // Creating the pokemon into the DB
    const pokemon = await PokemonModel.create({
        pokemon_num: inputs.pokemon_num,
        pokemon_name: inputs.pokemon_name
    });

    // Check if the pokemon has been successfully create
    if(pokemon){
        res.status(201).json({message: `The pokemon ${inputs.pokemon_name} has been correctly created.`});
    }else{
        res.status(400);
        throw new Error("Error while creating the pokemon, please retry later.");
    }
});

// @desc Updating a pokemon from the DB
// @route PUT /api/pokemon/id
// @access Private (admin)
const updatePokemon = asyncHandler(async (req, res) => {
    // Getting the data from the form
    const {num, name} = req.body;

    // Checking if all the fields are filled
    if(!num || num === '' || !name || name === ''){
        res.status(400);
        throw new Error("Thanks to filled all the required fields.");
    }

    // Checking if the pokemon exist
    const pokemon = await PokemonModel.findById(req.params.id);
    if(!pokemon){
        res.status(400);
        throw new Error("No pokemon found.");
    }

    // Updating the pokemon
    const updatedPokemon = await PokemonModel.findByIdAndUpdate(req.params.id, {
        pokemon_num: num,
        pokemon_name: name
    });
    updatedPokemon.save();
    res.status(201).json({message: `The pokemon ${pokemon.pokemon_name} has been updated successfully.`});
});

// @desc Delete a pokemon from the DB
// @route DELETE /api/pokemon/id
// @access Private (admin)
const deletePokemon = asyncHandler(async (req, res) => {
    const pokemon = await PokemonModel.findById(req.params.id);
    if(!pokemon){
        res.status(400);
        throw new Error("No pokemon found.");
    }

    const removePokemon = await PokemonModel.findByIdAndDelete(req.params.id);
    res.status(203).json({message: `The pokemon ${removePokemon.pokemon_name} has been successfully deleted.`});
});

module.exports = {
    getPokemons,
    getSinglePokemon,
    getPokemonById,
    createPokemon,
    updatePokemon,
    deletePokemon,
}
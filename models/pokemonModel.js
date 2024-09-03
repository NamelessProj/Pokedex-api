// IMPORT DB LIBRARY
const mongoose = require('mongoose');

// POKEMON SCHEMA
const pokemonSchema = mongoose.Schema({
    pokemon_num: {
        type: String,
        required: true,
    },
    pokemon_name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
}, {timestamps: true});

module.exports = mongoose.model('Pokemon', pokemonSchema);
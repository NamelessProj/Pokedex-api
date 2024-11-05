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
    },
    pokemon_infos: {
        pokemon_img: {
            type: String,
            default: '/pokemon/bulbizarre.png'
        },
        pokemon_gender: {
            type: [String]
        },
        pokemon_width: {
            type: Number,
            default: 0.0
        },
        pokemon_category: {
            type: String,
            default: 'Undefined'
        },
        pokemon_weight: {
            type: Number,
            default: 0.0
        },
        pokemon_talent: {
            type: String,
            default: 'Undefined'
        },
        pokemon_tooltip: {
            type: String,
            default: 'Undefined'
        },
        pokemon_blue_text: {
            type: String,
            default: "Aucun texte"
        },
        pokemon_red_text: {
            type: String,
            default: "Aucun texte"
        },
        pokemon_pv : {
            type: Number,
            default: 0
        },
        pokemon_attack : {
            type: Number,
            default: 0
        },
        pokemon_defense : {
            type: Number,
            default: 0
        },
        pokemon_special_attack : {
            type: Number,
            default: 0
        },
        pokemon_special_defense : {
            type: Number,
            default: 0
        },
        pokemon_speed : {
            type: Number,
            default: 0
        },
        pokemon_evo_1_num: {
            type: String,
            default: "0001"
        },
        pokemon_evo_1_name: {
            type: String,
            default: "bulbizarre"
        },
        pokemon_evo_2_num: {
            type: String,
            default: "0002"
        },
        pokemon_evo_2_name: {
            type: String,
            default: "herbizarre"
        },
        pokemon_evo_3_num: {
            type: String,
            default: "0003"
        },
        pokemon_evo_3_name: {
            type: String,
            default: "florizarre"
        },
        pokemon_type : {
            type: [{
                name: String,
                background: String
            }],
        },
        pokemon_weakness : {
            type: [{
                name: String,
                background: String
            }],
        },
    }
}, {timestamps: true});

module.exports = mongoose.model('Pokemon', pokemonSchema);
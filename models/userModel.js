// Import libraries
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Data schema for users 
const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

// Compare the user password with the one store in the DB
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

// Encrypting the password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
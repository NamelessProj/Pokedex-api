// MONGOOSE IMPORT - MONGODB
const mongoose = require('mongoose');

// CONNECTION TO THE DB
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI);
    }catch(err){
        console.log(err);
    }
}

module.exports = connectDB;
const express = require('express');
const {errorHandler} = require("./middleware/errorHandler");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection");
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// CONNECTION TO THE DB
connectDB();

// SERVER CONFIG
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES
// ROUTE - pokemon
app.use('/api/pokemon', require('./routes/pokemonRoutes'));
// ROUTE - user
app.use('/api/user', require('./routes/userRoutes'));

// DISPLAY ERRORS STACK IN DEV
app.use(errorHandler);

// CONNECTION TO MONGO AND WE RUN THE SERVER
mongoose.connection.once('open', () => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

// ON ERRORS ON CONNECTION
mongoose.connection.on('error', (err) => {
    console.log(`Error connecting to DB: ${err}`);
});
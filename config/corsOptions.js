const allowedOrigins = require('./allowedOrigins');

// Function for "cors" options to authorized or not to access our API
const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){ // !origin = app Windows
            callback(null, true);
        }else{
            callback(new Error("Origins not allowed by CORS."));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions;
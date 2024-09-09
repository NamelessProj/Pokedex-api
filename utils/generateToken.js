const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'dev', // Use a https cookie in dev mode
        sameSite: 'strict', // Prevent CSRF attack
        maxAge: 30*24*60*60*1000, // 30 day
    });
}

module.exports = {
    generateToken,
}
//Bring in the necessary stuff
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next) => {
    //initialise a token
    let token
    //check for the token in the headers
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        //if this is true
        try {
            //Get token from header
            //this is formatted as bearer token (with the space)
            token = req.headers.authorization.split(' ')[1] //the one index is the token itself
            // Verify token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get user from token 
            // Basically, the model User findbyid will return the user and password, however, only want the user 
            req.user = await User.findById(decoded.id).select('-password')
            
            //This is to call whatever the next piece of middleware is 
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized')
    }
})

//to export the protect function 
module.exports = {protect}
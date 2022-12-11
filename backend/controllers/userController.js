//this will handle all the try catch 
const asyncHandler = require('express-async-handler')

// @description Register a new user
// @route       /api/users
// @access      Public
const registerUser = asyncHandler(async(req, res) => {
    //in req.body is where the data is going to be stored
    console.log(req.body) //need to send the body parser middleware (else it will be undefined)

    //destructure from the req.body
    const {name , email, password} = req.body

    //validation 
    if(!name  || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields') //we can create a custom error handler in a middleware
    }

    res.send('Register Route')
})

// @description Login a user
// @route       /api/users/login
// @access      Public
const loginUser = asyncHandler(async(req, res) => {
    res.send('Login Route')
})

//once you export, remember to bring it in to the userRoutes file 
module.exports = {
    registerUser, 
    loginUser
}
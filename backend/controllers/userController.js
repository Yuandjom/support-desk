//this will handle all the try catch 
const asyncHandler = require('express-async-handler')
//bring in bcrypt to hash the password 
const bcrypt = require('bcryptjs') //note that when we require, it is bcryptjs
//bring in the model 
const User = require('../models/userModel')

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

    //if the name email and password is there
    //Find if user already exists
    //In the user model, findOne is finding on document. We can say it is find by email 
    const userExists = await User.findOne({email: email})

    //if the user exist
    if(userExists){
        res.status(400) //400 is a client error
        throw new Error('User already exists')
    }

    // Hash the password
    //note that these functions returns promises thats why we are using await 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({ //this will be stored in the User model 
        name, 
        email, 
        password: hashedPassword
    })

    if(user){ //this is to store it as a json file 
        //we want to return a token
        res.status(201).json({
            //use _id as that is how mongoDB stores their id
            _id: user._id, 
            name: user.name, 
            email: user.email
        })
    }else{
        res.status(400)
        throw new error('Invalid user data')
    }

    //no need to send anymore
    // res.send('Register Route')
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
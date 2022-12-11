//bring in express
const express = require('express')
//bring in the environment variable 
const dotenv = require('dotenv').config()
//get the errorHandler function from the errorMiddleware (then pass it into the app.use)
const {errorHandler} = require('./middleware/errorMiddleware')
//this is from the env file
const PORT = process.env.PORT || 5000

//initialise the app variable
const app = express()

//this is the middleware to have the body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//creating a route with express
//use postman to test for the response
//this is a get request
app.get('/', (req, res) => {
    //res.send('hello') response
    
    //send a json, set status
    res.status(200).json({message: 'Welcome to the Support Desk API'})
})

//to use the route 
//the end point is /api/users
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler) //this wont show in production, only show in development

//listen to a specific port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
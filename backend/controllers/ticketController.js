//bring in the asyncHandler
const asyncHandler = require('express-async-handler')

//bring in both the user and the ticket model
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async(req, res) => { //this si a get request
    //get the tickets using the json web token
    //Get user using the id in the JWT
    const user = await User.findById(req.user.id) //when we send a post req, the user will be created and we are getting it from here 
    
    if(!user){ //if user does not exist
        res.status(401)
        throw new Error('User not found')
    }
    //get the tickets
    //this is find by the user
    const tickets = await Ticket.find({user: req.user.id})

    res.status(200).json(tickets)
})//remember that after u create the function, you have to export it

//geting the route of a single ticket and we'll get it by ID
// @desc Get user ticket
// @route GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async(req, res) => { //this si a get request
    //get the tickets using the json web token
    //Get user using the id in the JWT
    const user = await User.findById(req.user.id) //when we send a post req, the user will be created and we are getting it from here 
    
    if(!user){ //if user does not exist
        res.status(401)
        throw new Error('User not found')
    }
    //get the tickets
    //this is find by the user
    const ticket = await Ticket.findById(req.params.id) //get the id from the url 
    //if there is no ticket by that id 
    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }
    //only that user can access their own ticket 
    if(ticket.user.toString() !== req.user.id){ //if does not match 
        res.status(401)
        throw new Error('Not Authorized')
    }

    res.status(200).json(ticket)
})//remember that after u create the function, you have to export it


// @desc Create new tickets
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async(req, res) => { //this is a post request
    //get the body ticket, the product and the description, status
    //destrucrture product and description 
    const {product, description} = req.body

    //this is to make sure that there is a product and description 
    if(!product || !description){
        res.status(400)
        throw new Error('Please add a product and a description')
    }
    //get the tickets using the json web token
    //Get user using the id in the JWT
    const user = await User.findById(req.user.id) //when we send a post req, the user will be created and we are getting it from here 
    
    if(!user){ //if user does not exist
        res.status(401)
        throw new Error('User not found')
    }

    //create the ticket. The create method take in an object 
    const ticket = await Ticket.create({
        product, 
        description,
        user : req.user.id, 
        status : 'new'
    })
     
    //return the ticket
    res.status(201).json(ticket)
})//remember that after u create the function, you have to export it

// @desc Delete user ticket
// @route DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async(req, res) => { //this si a get request
    //get the tickets using the json web token
    //Get user using the id in the JWT
    const user = await User.findById(req.user.id) //when we send a post req, the user will be created and we are getting it from here 
    
    if(!user){ //if user does not exist
        res.status(401)
        throw new Error('User not found')
    }
    //get the tickets
    //this is find by the user
    const ticket = await Ticket.findById(req.params.id) //get the id from the url 
    //if there is no ticket by that id 
    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }
    //only that user can access their own ticket 
    if(ticket.user.toString() !== req.user.id){ //if does not match 
        res.status(401)
        throw new Error('Not Authorized')
    }

    await ticket.remove()

    res.status(200).json({success: true})
})//remember that after u create the function, you have to export it

// @desc Update user ticket
// @route PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async(req, res) => { //this si a get request
    //get the tickets using the json web token
    //Get user using the id in the JWT
    const user = await User.findById(req.user.id) //when we send a post req, the user will be created and we are getting it from here 
    
    if(!user){ //if user does not exist
        res.status(401)
        throw new Error('User not found')
    }
    //get the tickets
    //this is find by the user
    const ticket = await Ticket.findById(req.params.id) //get the id from the url 
    //if there is no ticket by that id 
    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }
    //only that user can access their own ticket 
    if(ticket.user.toString() !== req.user.id){ //if does not match 
        res.status(401)
        throw new Error('Not Authorized')
    }

    //take in the req id
    const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updateTicket)
})//remember that after u create the function, you have to export it

module.exports = { //export and bring it to the ticketRoutes
    getTickets, 
    createTicket, 
    getTicket,
    deleteTicket, 
    updateTicket
} 

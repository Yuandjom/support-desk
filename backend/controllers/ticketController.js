//bring in the asyncHandler
const asyncHandler = require('express-async-handler')

//bring in both the user and the ticket model
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async(req, res) => { //this si a get request
    res.status(200).json({message: 'getTickets'})
})//remember that after u create the function, you have to export it

// @desc Create new tickets
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async(req, res) => { //this is a post request
    res.status(200).json({message: 'createTicket'})
})//remember that after u create the function, you have to export it


module.exports = { //export and bring it to the ticketRoutes
    getTickets, 
    createTicket
} 

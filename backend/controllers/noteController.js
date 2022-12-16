//bring in the asyncHandler
const asyncHandler = require('express-async-handler')

//bring in the user, ticket and note model
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note  = require('../models/noteModel')
// @desc Get notes for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async(req, res) => { //this si a get request
    //get the tickets using the json web token
    //Get user using the id in the JWT
    const user = await User.findById(req.user.id) //when we send a post req, the user will be created and we are getting it from here 
    
    if(!user){ //if user does not exist
        res.status(401)
        throw new Error('User not found')
    }
    //get the tickets
    //this will get from the url
    const ticket = await Ticket.findById(req.params.ticketId)

    //make sure that it is the user ticket
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const notes = await Note.find({ticket: req.params.ticketId})

    //respond back with the notes
    res.status(200).json(notes)
})//remember that after u create the function, you have to export it

// @desc Create ticket note
// @route POST /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async(req, res) => { //this si a get request
    //get the tickets using the json web token
    //Get user using the id in the JWT
    const user = await User.findById(req.user.id) //when we send a post req, the user will be created and we are getting it from here 
    
    if(!user){ //if user does not exist
        res.status(401)
        throw new Error('User not found')
    }
    //get the tickets
    //this will get from the url
    const ticket = await Ticket.findById(req.params.ticketId)

    //make sure that it is the user ticket
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const note = await Note.create({
        text: req.body.text, //this is coming from the form 
        isStaff: false,
        ticket: req.params.ticketId, 
        user: req.user.id,
    })
    //respond back with the notes
    res.status(200).json(note)
})//remember that after u create the function, you have to export it

module.exports ={ //this is exported into the note routes
    getNotes,
    addNote
}
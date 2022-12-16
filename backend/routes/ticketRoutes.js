//bring in express
const express = require('express')
//bring in the router
const router = express.Router()
//bring in the functions 
const {getTickets, getTicket,createTicket, deleteTicket, updateTicket} = require('../controllers/ticketController')

//get the protect function from middleware
const {protect}  = require('../middleware/authMiddleware')

// Re-route into note router
const noteRouter = require('./noteRoutes')
//we want this to pertain to the noteRouter
router.use('/:ticketId/notes', noteRouter)

//chaining get and post in this one route
//in order to get your tickets you have to be autheticated
router.route('/').get(protect, getTickets).post(protect, createTicket)

router.route('/:id').get(protect,getTicket ).delete(protect, deleteTicket).put(protect, updateTicket)

module.exports = router //need to specify the route in the server js
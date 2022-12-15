//bring in express
const express = require('express')
//bring in the router
const router = express.Router()
//bring in the functions 
const {getTickets, createTicket} = require('../controllers/ticketController')

//get the protect function from middleware
const {protect}  = require('../middleware/authMiddleware')

//chaining get and post in this one route
//in order to get your tickets you have to be autheticated
router.route('/').get(protect, getTickets).post(protect, createTicket)

module.exports = router //need to specify the route in the server js
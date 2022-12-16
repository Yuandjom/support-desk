const express = require('express')
//need to set a property at the router, so that we can go into our ticket routes and bring in Note router
const router = express.Router({mergeParams: true})
const {getNotes, addNote} = require('../controllers/noteController')

const {protect} = require('../middleware/authMiddleware')

//getNotes is coming from the controller
router.route('/').get(protect, getNotes).post(protect, addNote)

module.exports = router

//this is the end-point
/**
 * /api/tickets/:ticketId/notes
 * 
 */
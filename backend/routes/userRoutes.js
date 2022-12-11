const express = require('express')
const router = express.Router()
//pass in the two function which is
const {registerUser, loginUser} = require('../controllers/userController')

// router.post('/', (req, res) => {
//     res.send('Register Route')
// })
router.post('/', registerUser)

// router.post('/login', (req, res) => {
//     res.send('Login Route')
// })
router.post('/login', loginUser)

//export the router to the server js
module.exports = router
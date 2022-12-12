const express = require('express')
const router = express.Router()
//pass in the two function which is
const {registerUser, loginUser, getMe} = require('../controllers/userController')
//bring in the protect function
const {protect} = require('../middleware/authMiddleware')

// router.post('/', (req, res) => {
//     res.send('Register Route')
// })
router.post('/', registerUser) //POST carries quest parameter in message body 

// router.post('/login', (req, res) => {
//     res.send('Login Route')
// })
router.post('/login', loginUser)

//Protected routes, the getMe function is going to come from the controller
//router.get('/me', async(req, res) => {
//  res.send
//})
// note that the middleware is the protect in the middle 
router.get('/me',protect, getMe)

//export the router to the server js
module.exports = router
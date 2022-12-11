const registerUser = (req, res) => {
    res.send('Register Route')
}

const loginUser = (req, res) => {
    res.send('Login Route')
}

//once you export, remember to bring it in to the userRoutes file 
module.exports = {
    registerUser, 
    loginUser
}
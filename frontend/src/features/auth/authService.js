//use axios to fetch the api
import axios from 'axios'

//we are dealing with the auth stuff, so /api/users is the end point 
const API_URL = '/api/users'

// Register user
const register = async(userData) => {
    //we are making a post request to API_URL which is API users
    //this is similar to what we did in post man but now it is from our application 
    const response = await axios.post(API_URL, userData)

    if(response.data){
        //save the json web token 
        //need to use stringify as localStorage only holds string
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    //this will be the user data and token 
    return response.data
}

//make sure we export this 
//any function that is put in here we can export it 
const authService = {
    register
}

//export and bring it to authSlice
export default authService
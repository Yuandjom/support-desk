//this is where we make our request
import axios from 'axios'

const API_URL = '/api/tickets/'

//Create new ticket
const createTicket = async(ticketData, token) => {
    //create the config
    const config = {
        //note that when we send the token, it must be in headers, in the authorisation field
        headers: {
            //this is handled in the middleware
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, ticketData, config)

    return response.data
}
//get user tickets
const getTickets = async(token) => {
    //create the config
    const config = {
        //note that when we send the token, it must be in headers, in the authorisation field
        headers: {
            //this is handled in the middleware
            Authorization: `Bearer ${token}`
        }
    }
    //we are making a get request to the API_URL
    const response = await axios.get(API_URL, config)

    return response.data
}
//remember to export this


const ticketService = {
    createTicket, 
    getTickets,
}

export default ticketService
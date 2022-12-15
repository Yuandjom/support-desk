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


const ticketService = {
    createTicket
}

export default ticketService
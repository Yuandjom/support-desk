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
//get user ticket
const getTicket = async(ticketId,token) => {
    //create the config
    const config = {
        //note that when we send the token, it must be in headers, in the authorisation field
        headers: {
            //this is handled in the middleware
            Authorization: `Bearer ${token}`
        }
    }
    //we are making a get request to the API_URL
    const response = await axios.get(API_URL + ticketId, config)

    return response.data

}
//Close ticket
const closeTicket = async(ticketId,token) => {
    //create the config
    const config = {
        //note that when we send the token, it must be in headers, in the authorisation field
        headers: {
            //this is handled in the middleware
            Authorization: `Bearer ${token}`
        }
    }
    //we are making a put request to the API_URL, second argument is data and we are adding object
    const response = await axios.put(API_URL + ticketId,{status: 'closed'} ,config)

    return response.data
} 

const ticketService = {
    createTicket, 
    getTickets,
    getTicket,
    closeTicket,//after export, remember to go back to the slice and handle the reducer
}

export default ticketService
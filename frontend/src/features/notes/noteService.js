import axios from "axios";

//this is the root URL
const API_URL = 'api/tickets/'

//get ticket notes
const getNotes = async(ticketId,token) => {
    //create the config
    const config = {
        //note that when we send the token, it must be in headers, in the authorisation field
        headers: {
            //this is handled in the middleware
            Authorization: `Bearer ${token}`
        }
    }
    //we are making a get request to the API_URL
    const response = await axios.get(API_URL + ticketId + '/notes', config)

    return response.data

}

const noteService = {
    getNotes
}
export default noteService
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import ticketService from './ticketService'
/**
 * note that for every resource in redux:
 * we can just create these four in the initialState
 * 
 *  isError: false, 
    isSuccess: false, 
    isLoading: false, 
    message: ''
 * 
 */

//create the global state for ticket
const initialState = {
    tickets: [], //tickets array for multiple tickets
    ticket: {}, //ticket object for a single tickets
    isError: false, 
    isSuccess: false, 
    isLoading: false, 
    message: ''
}
//Create new ticket
export const createTicket = createAsyncThunk('tickets/create', async(ticketData, thunkAPI) => {
    //do a try catch
    try {
        //the reason why we need the token is because this is a protected route
        //get the token using thunkAPI
        const token = thunkAPI.getState().auth.user.token
        //the service will create a ticket from the ticketdata
        return await ticketService.createTicket(ticketData, token) //passing the data to the service
    } catch (error) {
        //if something goes wrong, we want to get the message from the backend 
        //get the message from the backend by creating a variable
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()

        //this means if sth went wrong, if we have the message, we want to pass the message in 
        //rejectWithValue
        return thunkAPI.rejectWithValue(message)

    }
})

export const ticketSlice = createSlice({
    name: 'ticket', 
    initialState, 
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer //remember to bring that in to the store




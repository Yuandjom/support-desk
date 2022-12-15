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

export const ticketSlice = createSlice({
    name: 'ticket', 
    initialState, 
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {

    }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer //remember to bring that in to the store




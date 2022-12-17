import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import noteService from './noteService'

//create the initial state
const initialState = {
    //array of notes
    notes : [], 
    isError: false, 
    isSuccess: false, 
    isLoading: false, 
    message: ''
}
//Get ticket notes
export const getNotes = createAsyncThunk('notes/getAll', async(ticketId, thunkAPI) => {
    //do a try catch
    try {
        //the reason why we need the token is because this is a protected route
        //get the token using thunkAPI
        const token = thunkAPI.getState().auth.user.token
        //the service will get tickets using the token 
        return await noteService.getNotes( ticketId,token)
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

//Create ticket note
export const createNote = createAsyncThunk('notes/create', async({noteText, ticketId}, thunkAPI) => {
    //do a try catch
    try {
        //the reason why we need the token is because this is a protected route
        //get the token using thunkAPI
        const token = thunkAPI.getState().auth.user.token
        //the service will get tickets using the token 
        return await noteService.createNote(noteText ,ticketId,token)
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
export const noteSlice =createSlice({
    name: 'note', 
    initialState, 
    reducers: {
        reset: (state) => initialState
    }, 
    extraReducers:(builder) => {
        builder
        .addCase(getNotes.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getNotes.fulfilled, (state, action) => { //note that for fufilled we are getting data, so we need to pass in an action 
            state.isLoading = false
            state.isSuccess = true
            state.notes = action.payload
        })
        .addCase(getNotes.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(createNote.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createNote.fulfilled, (state, action) => { //note that for fufilled we are getting data, so we need to pass in an action 
            state.isLoading = false
            state.isSuccess = true
            state.notes.push(action.payload) //show without reload
        })
        .addCase(createNote.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = noteSlice.actions
export default noteSlice.reducer //bring it into the store js
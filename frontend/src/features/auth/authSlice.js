//go recap about reducers
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

//getting the authService from the js file  (object)
import authService from './authService'

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

//create out initialState 
//this will be an object which is like the GLOBAL state
const initialState = {
    //if there is a user then use it, else Null
    user: user? user: null, 
    isError: false, 
    isSuccess: false, 
    isLoading: false, 
    message: ''
}

//create the AsyncThunk, which is just a function to create asynchronous data
//note that the second argument is an asynchronous function
//register new user
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    //do a try catch
    try {
        return await authService.register(user)
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
//Reducers, as the name suggests, take in two things: previous state and an action
//login new user
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    //do a try catch
    try {
        return await authService.login(user)
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

//Logout user
export const logout = createAsyncThunk('auth/logout', async(user, thunkAPI) => {
    await authService.logout() //call it from the header
})

export const authSlice = createSlice({ //take in an object
    name: 'auth', 
    initialState, 
    reducers: { //reset to default state
        //call the reset will be in our register
        reset: (state) => { //we add the reset here but we also need to export it at the bottom
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    }, 
    extraReducers: (builder) =>{ //take in cases and change based on the case
        builder
            .addCase(register.pending, (state) => {
                //when it is pending 
                //we set the state
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false //set it to false as the request is fulfilled
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false //set it to false as the request is fulfilled
                state.isError = true
                state.message = action.payload //this payload is from above, thunkAPI.rejectWithValue(message)
                state.user = null
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.user = null
            })
            .addCase(login.pending, (state) => {
                //when it is pending 
                //we set the state
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false //set it to false as the request is fulfilled
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false //set it to false as the request is fulfilled
                state.isError = true
                state.message = action.payload //this payload is from above, thunkAPI.rejectWithValue(message)
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer //note that any reducers create need to be brought to the store
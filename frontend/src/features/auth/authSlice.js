//go recap about reducers
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

//create out initialState 
//this will be an object 
const initialState = {
    user: null, 
    isError: false, 
    isSuccess: false, 
    isLoading: false, 
    message: ''
}

//create the AsyncThunk, which is just a function to create asynchronous data
//note that the second argument is an asynchronous function
//register new user
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    console.log(user)
})

//login new user
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    console.log(user)
})

export const authSlice = createSlice({ //take in an object
    name: 'auth', 
    initialState, 
    reducers: {}, 
    extraReducers: (builder) =>{ //take in cases and change based on the case

    }
})

export default authSlice.reducer //note that any reducers create need to be brought to the store
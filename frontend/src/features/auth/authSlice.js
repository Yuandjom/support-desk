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

export const authSlice = createSlice({ //take in an object
    name: 'auth', 
    initialState, 
    reducers: {}, 
    extraReducers: (builder) =>{ //take in cases and change based on the case

    }
})

export default authSlice.reducer //note that any reducers create need to be brought to the store
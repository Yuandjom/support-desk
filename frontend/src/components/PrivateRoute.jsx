import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'
import React from 'react'

const PrivateRoute = () => {
    //bring in the status
    const { loggedIn, checkingStatus } = useAuthStatus()

    if (checkingStatus) {
        return <Spinner />
    }

    //if the user is loggedin, direct to the outlet, else redirect to login
    return loggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute //to use the private route, go to app.js
//note that for creating private routes, we need to nest the routes
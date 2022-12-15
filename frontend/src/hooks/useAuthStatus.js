//this hook is to make sure that the user have to be login so that they can access the new ticket page
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"; //we need to select the user from our state

//export the function 
export const useAuthStatus = () => {
    //create our state
    const [loggedIn, setLoggedIn] = useState(false)
    //checking status
    const [checkingStatus, setCheckingStatus] = useState(true)

    //get the user from the state
    //note that useSelector use the global user state
    const {user} = useSelector((state) => state.auth) //getting user from redux. Note dont put {} here

    //we want this to run when the user changes
    useEffect(() => {
        //check to see if the user is there/login in
        if(user){ //we going to use this through our private route component
            setLoggedIn(true)
        } else{
            setLoggedIn(false)
        }
        setCheckingStatus(false)
    }, [user]) //user is the dependency

    return {loggedIn, checkingStatus}
}
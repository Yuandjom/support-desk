import React from 'react'
import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa' //change the icon to sign in
//bring in two hooks 
import { useSelector, useDispatch } from 'react-redux'
//bring in the login function
import { login, reset } from '../features/auth/authSlice'
//for the password verification 
import { toast } from 'react-toastify' //inorder for this to show, we need to add in the app.js 
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

function Login() {
    //this is to initialise the formdata object
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    //destruture the formdata
    const { email, password } = formData

    //initialise the dispatch
    const dispatch = useDispatch()
    //initialise navigate
    const navigate = useNavigate()

    //this is from the global state
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

    useEffect(() => {
        //we are bringing in all the state
        if (isError) {
            //the message here will be set in redux and we are grabbing it through the selector
            toast.error(message)
        }

        //Redirect when logged in 
        if (isSuccess || user) {
            //if success just go to the home page
            navigate('/')
        }
        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value //change the field of the name
        }))
    }

    //on submit function
    //add required to the form so that we dont need to check for the fields
    const onSubmit = (e) => { //this is to handle the password confirmation
        e.preventDefault()
        //construct the user
        const userData = { //from the local state
            email,
            password
        }
        dispatch(login(userData))
    }
    if (isLoading) {
        return <Spinner />
    }

    //note that the type in the input is the type of value to be entered
    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please log in to get support</p>
            </section>

            <section>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id='email'
                            name='email'
                            value={email}
                            onChange={onChange}
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id='password'
                            name='password'
                            value={password}
                            onChange={onChange}
                            placeholder='Enter your password'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login
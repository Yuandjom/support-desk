import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
//for the password verification 
import { toast } from 'react-toastify' //inorder for this to show, we need to add in the app.js 
//bring in two hooks 
import { useSelector, useDispatch } from 'react-redux'
//bring in the register function
import { register, reset } from '../features/auth/authSlice'

function Register() {
    //this is to initialise the formdata object
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })
    //destruture the formdata
    const { name, email, password, password2 } = formData

    const dispatch = useDispatch() //dispatch register and any other functions we have 
    const navigate = useNavigate()

    //useSelector bring in pieces of our state. This would mathc whatever we put for our state
    //these are from the authSlice
    //basically this is bring any piece of the global state into a componenet by using useSelector
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

        if (password !== password2) {
            toast.error("Passwords do not match")
        } else {
            //if the password match
            //creating the userData
            const userData = {
                name,
                email,
                password
            }
            //this is dispatching the register from the authSlice
            dispatch(register(userData))
        }
    }

    //note that the type in the input is the type of value to be entered
    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id='name'
                            name='name'
                            value={name}
                            onChange={onChange}
                            placeholder='Enter your name'
                            required
                        />
                    </div>
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
                        <input
                            type="password"
                            className="form-control"
                            id='password2'
                            name='password2'
                            value={password2}
                            onChange={onChange}
                            placeholder='Confirm password'
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

export default Register
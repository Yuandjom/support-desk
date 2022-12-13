import React from 'react'
import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa' //change the icon to sign in
//bring in two hooks 
import { useSelector, useDispatch } from 'react-redux'
//bring in the login function
import { login } from '../features/auth/authSlice'
//for the password verification 
import { toast } from 'react-toastify' //inorder for this to show, we need to add in the app.js 


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
    //this is from the global state
    const { user, isLoading, isSuccess, message } = useSelector(state => state.auth)

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
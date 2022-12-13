import React from 'react'
import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
//for the password verification 
import { toast } from 'react-toastify' //inorder for this to show, we need to add in the app.js 


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
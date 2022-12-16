//this is a form with some fields in our local state
import React from 'react'
import { useState, useEffect } from 'react'
//get the user from the global state
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewTicket() {
    //before setting the local state, we are getting the user from the global state
    const { user } = useSelector((state) => state.auth)
    //useSelector from the ticket state not the auth
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets) //note that state.tickets is from store.js 

    //initialise the dispatch
    const dispatch = useDispatch()
    //initialise the navigate
    const navigate = useNavigate()

    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState('iPhone')
    const [description, setDescription] = useState('')

    //check for error in useEffect
    useEffect(() => {
        if (isError) {
            //if error, send back a message
            toast.error(message)
        }

        if (isSuccess) {
            //first dispatch reset to just reset the state
            dispatch(reset())
            navigate('/tickets') //direct to /tickets route
        }
        //after done 
        dispatch(reset())
    }, [dispatch, isError, isSuccess, navigate, message])

    const onSubmit = (e) => {
        e.preventDefault()
        //dispatch the createTicket
        dispatch(createTicket({ product, description }))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url='/' />
            <section className="heading">
                <h1>Create New Ticket</h1>
                <p>Please fill out the form below</p>
            </section>

            <section className='form'>
                <div className="form-group">
                    <label htmlFor='name'>Customer Name</label>
                    <input type="text" className="form-control" value={name} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor='name'>Customer Email</label>
                    <input type="text" className="form-control" value={email} disabled />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor='product'>Product</label>
                        <select name="product" id="product" value={product} onChange={(e) => setProduct(e.target.value)}>
                            <option value='iPhone'>iPhone</option>
                            <option value='Macbook Pro'>Macbook Pro</option>
                            <option value='iMac'>iMac</option>
                            <option value='iPad'>iPad</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description of the issue</label>
                        <textarea name="description" id="description" className='form-control'
                            placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}>
                        </textarea>
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

export default NewTicket //rmb to bring to app.js after the page is created
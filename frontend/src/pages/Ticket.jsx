import React from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
//get the getTicket and reset function 
import { getTicket, reset } from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

function Ticket() {
    //use the useSelector hooks
    //the ticket we are pulling it from here
    const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets)

    const dispatch = useDispatch()
    //initialise params
    const params = useParams()
    const { ticketId } = useParams() //get the ticketId from the URL

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        //getTicket takes in the ticketId
        dispatch(getTicket(ticketId))
        //eslint-disable-next-line
    }, [isError, message, ticketId])

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h3>Something Went Wrong</h3>
    }

    //note that the ticket status is from the backend 
    return (
        <div className='ticket-page'>
            <header className="ticket-header">
                <BackButton url='/tickets'></BackButton>
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleDateString('en-SG')}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>
        </div>
    )
}

export default Ticket //rmb to export it to app.js
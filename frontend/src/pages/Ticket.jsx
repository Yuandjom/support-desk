import React from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getNotes, reset as notesReset } from '../features/notes/noteSlice'
//get the getTicket and reset function 
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'

function Ticket() {
    //use the useSelector hooks
    //the ticket we are pulling it from here
    const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets)
    //get the state from ticket
    const { notes, isLoading: notesIsLoading } = useSelector((state) => state.notes)

    const dispatch = useDispatch()
    //initialise params
    const params = useParams()
    const navigate = useNavigate()
    const { ticketId } = useParams() //get the ticketId from the URL

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        //getTicket takes in the ticketId
        dispatch(getTicket(ticketId))
        //dispatch the notes
        dispatch(getNotes(ticketId))
        //eslint-disable-next-line
    }, [isError, message, ticketId])

    //Close ticket
    const onTicketClose = () => {
        //dispatch close ticket
        dispatch(closeTicket(ticketId))
        toast.success('Ticket Closed')
        navigate('/tickets')
    }

    if (isLoading || notesIsLoading) {
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
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>

            {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
            ))}

            {ticket.status !== 'closed' && (
                <button onClick={onTicketClose} className="btn btn-block btn-danger">Close Ticket</button>
            )}
        </div>
    )
}

export default Ticket //rmb to export it to app.js
import React from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getNotes, reset as notesReset } from '../features/notes/noteSlice'
//get the getTicket and reset function 
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'

const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative'
    }
}
//this will look at the root at the index.html and mount it
Modal.setAppElement('#root')

function Ticket() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')

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
    // Create note submit
    const onNoteSubmit = (e) => {
        e.preventDefault()
        console.log('Submit')
        closeModal()
    }

    //Open/close modal
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

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

            {ticket.status !== 'closed' && (
                <button onClick={openModal} className='btn'> <FaPlus />Add Note</button>
            )}

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}
                contentLabel='Add Note'>
                <h2>Add Note</h2>
                <button className='btn-close' onClick={closeModal}>X</button>
                <form onSubmit={onNoteSubmit}>
                    <div className="form-group">
                        <textarea
                            name="noteText"
                            id="noteText"
                            className='form-control'
                            placeholder='Note text'
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn" type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>

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
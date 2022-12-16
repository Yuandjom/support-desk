import React from 'react'
import { Link } from 'react-router-dom'

//going to take in a prop of ticket
function TicketItem({ ticket }) {
    return (
        <div className='ticket'>
            <div>{new Date(ticket.createdAt).toLocaleString('en-SG')}</div>
            <div>{ticket.product}</div>
            <div className={`status status-${ticket.status}`}>
                {ticket.status}
            </div>
            <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
                View
            </Link>
        </div>
    )
}

export default TicketItem
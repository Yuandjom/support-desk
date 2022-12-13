//bring in Link
import { Link } from 'react-router-dom'
//bring in the icon 
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

import React from 'react'

function Home() {
    return (
        <>
            <section className="heading">
                <h1 className="">What do you need help with?</h1>
                <p>Please choose from an option below</p>
            </section>

            <Link to='/new-ticket' className='btn btn-reverse btn-block'>
                <FaQuestionCircle /> Create New Ticket
            </Link>
            <Link to='/tickets' className='btn btn-block'>
                <FaTicketAlt /> View My Tickets
            </Link>
        </>
    )
}

export default Home
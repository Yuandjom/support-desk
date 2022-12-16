import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'
//to bring the stuff from redux


function Tickets() {
    //to get the data from the state, we need to destructure
    const { tickets, isLoading, isSuccess } = useSelector((state) => state.tickets) //note that the state.tickets is from the store.js

    const dispatch = useDispatch()
    //clear the state from unmount
    useEffect(() => { //if we want something to happen on unmount, we need to return a function from useEffect
        return (() => {
            if (isSuccess) {
                //if success, the  we are going to reset
                dispatch(reset())
            }
        })
    }, [dispatch, isSuccess])// dependency array to control when the effect should run


    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch])

    //check for if it is loading before returning anything here 
    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <BackButton url='/' />
            <h1>Tickets</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>
                {tickets.map((ticket) => (
                    <TicketItem key={ticket._id} ticket={ticket} />
                ))}
            </div>
        </>
    )
}

export default Tickets //rmb to bring into the app.js 
import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa' //rmb to import from fa which is font awesome
import { Link, useNavigate } from 'react-router-dom'
//bring in two hooks, useSelector and useDispatcch
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
    //initialise the stuff
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //note that useSelector takes in the function (state) and what part of the state we are getting this from 
    const { user } = useSelector((state) => state.auth)

    //create the onLogout function 
    const onLogout = () => {
        //dispatch the logout function
        dispatch(logout())
        dispatch(reset())
        //navigate to the home page
        navigate('/')
    }

    return (
        <header className='header'>
            <div className="logo">
                <Link to='/'>Support Desk</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        <button className="btn" onClick={onLogout}><FaSignOutAlt /> Logout</button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )
                }

            </ul >
        </header >
    )
}

export default Header
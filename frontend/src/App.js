import React from 'react';
//set up the routes
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
//brough in from Register.jsx
import {ToastContainer} from 'react-toastify' //rmb that the toastContainer is outside the router so that we can always use it 
//rmb to also import the toastify css files
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home';
import Login from './pages/Login';
import NewTicket from './pages/NewTicket';
import Register from './pages/Register';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Tickets from './pages/Tickets'; //note that this is also a protected route
import Ticket from './pages/Ticket';

function App() {
  return (
    <>
    <Router>
      <div className='container'>
        <Header />
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/new-ticket' element={<PrivateRoute />}>
              <Route path='/new-ticket' element={<NewTicket />}></Route>
            </Route>
            <Route path='/tickets' element={<PrivateRoute />}>
              <Route path='/tickets' element={<Tickets />}></Route>
            </Route>
            <Route path='/ticket/:ticketId' element={<PrivateRoute />}>
              <Route path='/ticket/:ticketId' element={<Ticket />}></Route>
            </Route>
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  )


}

export default App;

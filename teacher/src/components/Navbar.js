import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/fontawesome-free-solid'

export default function Navbar({ sidebarClick }) {
  return (
    <nav className='navbar'>
      <div className="container-fluid justify-content-start row">
        <div className="col-6 d-flex">
          <span onClick={sidebarClick} className="navbar-toggler-icon my-auto"></span>
          <Link to={'/admin'} className='nav-link mx-3 text-secondary'>Home</Link>
        </div>
        <div className="col-6 text-end">
          <FontAwesomeIcon className='text-secondary' type='button' icon={faPowerOff} />
        </div>
      </div>
    </nav>
  )
}

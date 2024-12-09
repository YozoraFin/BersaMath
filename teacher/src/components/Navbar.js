import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/fontawesome-free-solid'

export default function Navbar({ sidebarClick, sidebar }) {
  return (
    <nav className='navbar'>
      <div className="container-fluid justify-content-start row">
        <div className={sidebar && window.innerWidth < 748 ? "col-12 d-flex" : "col-6 d-flex"}>
          <span onClick={sidebarClick} className="navbar-toggler-icon my-auto"></span>
          <Link to={'/bersamath'} className={sidebar && window.innerWidth < 748 ? 'nav-link mx-3 text-secondary d-none' : 'nav-link mx-3 text-secondary'}>Beranda</Link>
        </div>
        <div className={sidebar && window.innerWidth < 748 ? 'col-6 text-end d-none' : 'col-6 text-end'}>
          <FontAwesomeIcon className={sidebar && window.innerWidth < 748 ? 'text-secondary logout-button d-none' : 'text-secondary logout-button'} type='button' icon={faPowerOff} />
        </div>
      </div>
    </nav>
  )
}

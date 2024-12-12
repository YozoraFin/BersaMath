import React, { useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/fontawesome-free-solid'

export default function Navbar({ sidebarClick, sidebar }) {
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <nav className='navbar'>
      <div className="container-fluid justify-content-start row">
        <div className={"col-6 d-flex"}>
          <span onClick={sidebarClick} className="navbar-toggler-icon my-auto" data-bs-toggle={width < 450 ? "offcanvas" : ""} data-bs-target={width < 450 ? "#sidebaroffcanvas" : ""}></span>
          <Link to={'/bersamath'} className={'nav-link mx-3 text-secondary'}>Beranda</Link>
        </div>
        <div className={'col-6 text-end'}>
          <FontAwesomeIcon className={'text-secondary logout-button'} type='button' icon={faPowerOff} />
        </div>
      </div>
    </nav>
  )
}

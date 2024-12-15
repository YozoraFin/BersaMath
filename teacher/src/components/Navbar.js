import React, { useLayoutEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/fontawesome-free-solid'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Navbar({ sidebarClick }) {
  const [width, setWidth] = useState(0)
  const swal = withReactContent(Swal)
  const navigate = useNavigate()

  const handleLogout = () => {
    swal.fire({
      title: 'Apakah anda yakin?',
      icon: 'warning',
      text: 'Setelah keluar anda harus memasukkan password anda lagi',
      showCancelButton: true,
      cancelButtonColor: 'red',
      cancelButtonText: 'Batalkan'
    }).then((res) => {
      if(res.isConfirmed) {
        navigate('/')
      }
    })
  }

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
          <FontAwesomeIcon onClick={handleLogout} className={'text-secondary logout-button'} type='button' icon={faPowerOff} />
        </div>
      </div>
    </nav>
  )
}

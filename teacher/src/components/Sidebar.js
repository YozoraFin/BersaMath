import React, { Fragment, useLayoutEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfinity, faUser, faSchool, faTable, faTasks, faTachometerAlt } from '@fortawesome/fontawesome-free-solid'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ sidebar }) {
  const [width, setWidth] = useState(0)
  const location = useLocation()

  useLayoutEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <div className={width < 450 ? 'sidebar offcanvas offcanvas-start w-50' : sidebar ? "sidebar sidebar-open" : "sidebar"}  tabIndex="-1" id="sidebaroffcanvas">
      <div className="sidebar-profile">
        <div className="header row">
          <h4 className='brand-name m-0 col-9 text-light'>
            <img src={process.env.REACT_APP_BASE_URL+ '/assets/img/LogoMarcel.png'} width={35}/>
            <span className='ms-2'>BersaMath</span>
          </h4>
          {width < 450
            ? <button type="button" className="btn-close btn-close-white text-reset ms-auto text-light" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            : ""
          }
        </div>
        <div className="border-top"></div>
        <div className="profile">
          <Link to={'/bersamath/profil'} className='mentor-name'>
            <h5 className='m-0'>
              <FontAwesomeIcon size='sm' icon={faUser} /> 
              <span className='ms-2'>{localStorage.getItem('name')}</span>
            </h5>
          </Link>
        </div>
      </div>
      <div className="border-top"></div>
      <div className="content row">
        <Fragment>
          <Link className={location.pathname === '/bersamath' ? 'link active' : 'link'} to={'/bersamath'} >
            <FontAwesomeIcon size='sm' icon={faTachometerAlt} /> 
            <span className='ms-2'>Dasbor</span>
          </Link>
          <Link className={location.pathname.indexOf('kelas') > -1 || location.pathname.indexOf('xplorer') > -1 ? 'link active' : 'link'} to={'/bersamath/kelas'}>
            <FontAwesomeIcon size='sm' icon={faSchool} /> 
            <span className='ms-2'>Kelas</span>
          </Link>
          <Link className={location.pathname.indexOf('materi') > -1 ? 'link active' : 'link'} to={'/bersamath/materi'}>
            <FontAwesomeIcon size='sm' icon={faTable} /> 
            <span className='ms-2'>Materi</span>
          </Link>
          <Link className={location.pathname.indexOf('tugas') > -1 ? 'link active' : 'link'} to={'/bersamath/tugas'}>
            <FontAwesomeIcon size='sm' icon={faTasks} /> 
            <span className='ms-2'>Tugas</span>
          </Link>
        </Fragment>
      </div>
    </div>
  )
}

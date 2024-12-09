import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfinity, faUser, faSchool, faTable, faTasks, faTachometerAlt } from '@fortawesome/fontawesome-free-solid'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ sidebar }) {
  const location = useLocation()

  return (
    <div className={sidebar ? 'sidebar sidebar-open' : 'sidebar'}>
      <div className="sidebar-profile">
        <div className="header">
          <h4 className='brand-name m-0'>
            <FontAwesomeIcon size='sm' icon={faInfinity} /> 
            <span className='ms-2'>BersaMath</span>
          </h4>
        </div>
        <div className="border-top"></div>
        <div className="profile">
          <Link className='mentor-name'>
            <h5 className='m-0'>
              <FontAwesomeIcon size='sm' icon={faUser} /> 
              <span className='ms-2'>Pak Ageng</span>
            </h5>
          </Link>
        </div>
      </div>
      <div className="border-top"></div>
      <div className="content row">
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
      </div>
    </div>
  )
}

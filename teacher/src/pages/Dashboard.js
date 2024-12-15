import { faBook, faExclamation, faLocationArrow, faSearch, faTasks, faXRay } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/Api'

export default function Dashboard() {
  const [student, setStudent] = useState(0)
  const [grade, setGrading] = useState(0)
  const [lesson, setLesson] = useState(0)

  const getData = () => {
    api.get('api/v1/course/'+localStorage.getItem('course')+'/lesson/3/practice/1/submission').then((res) => {
      
    })
  }

  return (
    <div className="p-3">
      <div className="header row">
        <h1 className='title col-12 col-lg-6'>Dasbor</h1>
        <nav aria-label='breadcrumb' className='col-12 col-lg-6 d-block d-lg-flex justify-content-end align-items-center'>
          <ol className='breadcrumb'>
            <li className="breadcrumb-item active">Dasbor</li>
          </ol>
        </nav>
      </div>
      <div className="body mt-3">
        <div className="card-list row justify-content-center">
          <div className="col-12 col-lg-4 mb-3 mb-lg-0 pe-0">
            <Link to={'/bersamath/kelas'} className="card me-1">
              <div className="card-body">
                <div className="card-title text-main">
                  Xplorer Aktif
                </div>
                <div className="card-main text-second row">
                  <div className="col-6">
                    {student}
                  </div>
                  <div className="col-6 text-end">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                </div>
              </div>
              <div className="card-footer text-second">
                <div className="row">
                  <div className="col-10">
                    Lihat daftar Xplorer
                  </div>
                  <div className="col-2 text-end">
                    <FontAwesomeIcon className='card-nav' icon={faLocationArrow} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-12 col-lg-4 mb-3 mb-lg-0 pe-0">
            <Link to={'/bersamath/materi'} className="card me-1">
              <div className="card-body">
                <div className="card-title text-main">
                  Total Materi
                </div>
                <div className="card-main text-second row">
                  <div className="col-6">
                    {lesson}
                  </div>
                  <div className="col-6 text-end">
                    <FontAwesomeIcon icon={faBook} />
                  </div>
                </div>
              </div>
              <div className="card-footer text-second">
                <div className="row">
                  <div className="col-10">
                    Lihat daftar materi
                  </div>
                  <div className="col-2 text-end">
                    <FontAwesomeIcon className='card-nav' icon={faLocationArrow} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-12 col-lg-4 mb-3 mb-lg-0 pe-0">
            <Link to={'/bersamath/tugas'} className="card me-1">
              <div className="card-body">
                <div className="card-title text-main">
                  Tugas Dibuat
                </div>
                <div className="card-main text-second row">
                  <div className="col-6">
                    {grade}
                  </div>
                  <div className="col-6 text-end">
                    <FontAwesomeIcon icon={faExclamation} />
                  </div>
                </div>
              </div>
              <div className="card-footer text-second">
                <div className="row">
                  <div className="col-10">
                    Lihat daftar tugas
                  </div>
                  <div className="col-2 text-end">
                    <FontAwesomeIcon className='card-nav' icon={faLocationArrow} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

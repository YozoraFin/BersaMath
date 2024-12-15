import { faPlus } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/Api'

export default function Lesson() {
  const [loading, setLoading] = useState(true)
  const [lesson, setLesson] = useState([])
  const navigate = useNavigate()

  const getCourse = () => {
    api.get('api/v1/course/' + localStorage.getItem('course') + '/lesson?lesson_type=teori').then((res) => {
      if(res.status === 200) {
        setLesson(res.data?.data)
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    getCourse()
  }, [])

  return (
    <div className='p-3'>
      <div className="header row">
        <h1 className="title col-12 col-lg-6">Materi</h1>
        <nav aria-label='breadcrumb' className='col-12 col-lg-6 d-block d-lg-flex justify-content-end align-items-center'>
          <ol className='breadcrumb'>
            <li className="breadcrumb-item active">Materi</li>
          </ol>
        </nav>
      </div>
      <div className="body mt-3">
        <div className="card">
          <div className="card-header bg-main text-light row m-0">
            <h5 className='card-title text-nowrap col-6'>Daftar Materi</h5>
            <div className="col-6 text-end">
              <FontAwesomeIcon onClick={() => navigate('/bersamath/materi/create')} role='button' className='btn btn-success shadow' icon={faPlus} />
            </div>
          </div>
          <div className="table-responsive card-body">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                    <th>#</th>
                    <th>Judul</th>
                </tr>
              </thead>
              <tbody>
                {lesson.map((d, i) => {
                  return <tr role='button' onClick={() => navigate('/bersamath/materi/' + d?.lesson_id + '/' + d?.lesson_content.content_id)}>
                    <td>{i+1}</td>
                    <td>{d?.title}</td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

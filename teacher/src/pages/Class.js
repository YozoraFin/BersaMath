import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/Api'

export default function Class() {
  const [student, setStudent] = useState([])
  const navigate = useNavigate()

  const getData = () => {
    api.get('api/v1/student/').then((res) => {
      setStudent(res.data?.data)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="p-3">
      <div className="header row">
        <h1 className='title col-12 col-lg-6'>Kelas</h1>
        <nav aria-label='breadcrumb' className='col-12 col-lg-6 d-block d-lg-flex justify-content-end align-items-center'>
          <ol className='breadcrumb'>
            <li className="breadcrumb-item active">Kelas</li>
          </ol>
        </nav>
      </div>
      <div className="body mt-3">
        <div className="card card-primary">
          <div className="card-header bg-main text-light">
            <h5 className='card-title text-nowrap'>Daftar Xplorer</h5>
          </div>
          <div className="table-responsive card-body">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                    <th>#</th>
                    <th>Nama</th>
                    <th>No Whatsapp</th>
                    <th>Gatau</th>
                </tr>
              </thead>
              <tbody>
                {student?.map((d, i) => {
                  return <tr role='button' onClick={() => navigate('/bersamath/xplorer/1')}>
                    <td>{i+1}</td>
                    <td>{d?.name}</td>
                    <td>{d?.phone}</td>
                    <td>{d?.bio}</td>
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

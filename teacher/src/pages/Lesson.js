import { faPlus } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Lesson() {
  const [loading, setLoading] = useState(true)
  const [lesson, setLesson] = useState([])
  const navigate = useNavigate()

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
                    <th>Materi</th>
                </tr>
              </thead>
              <tbody>
                <tr role='button' onClick={() => navigate('/bersamath/materi/1')}>
                  <td>1</td>
                  <td>Pengenalan Matriks</td>
                  <td>Matriks</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/materi/1')}>
                  <td>2</td>
                  <td>Jenis-Jenis Matriks</td>
                  <td>Matriks</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/materi/1')}>
                  <td>3</td>
                  <td>Filosofi Matriks</td>
                  <td>Matriks</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/materi/1')}>
                  <td>4</td>
                  <td>Matriks dan Dinamika Pancasila</td>
                  <td>Matriks</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/materi/1')}>
                  <td>6</td>
                  <td>Matriks sebagai Sistem Etika</td>
                  <td>Matriks</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/materi/1')}>
                  <td>7</td>
                  <td>Matriks sebagai Dasar Penelitian</td>
                  <td>Matriks</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/materi/1')}>
                  <td>8</td>
                  <td>Matriks dan Perkembangan Manusia</td>
                  <td>Matriks</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/materi/1')}>
                  <td>9</td>
                  <td>Matriks dan Pengaruhnya dalam Kehidupan Sosial</td>
                  <td>Matriks</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/materi/1')}>
                  <td>100</td>
                  <td>Matriks dan Ilmu Politik</td>
                  <td>Matriks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

import { faPlus } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Practice() {
  const navigate = useNavigate()

  return (
    <div className='p-3'>
      <div className="header row">
        <h1 className="title col-12 col-lg-6">Tugas</h1>
        <nav aria-label='breadcrumb' className='col-12 col-lg-6 d-block d-lg-flex justify-content-end align-items-center'>
          <ol className='breadcrumb'>
            <li className="breadcrumb-item active">Tugas</li>
          </ol>
        </nav>
      </div>
      <div className="body mt-3">
        <div className="card">
          <div className="card-header bg-main text-light row m-0">
            <h5 className='card-title text-nowrap col-6'>Daftar Tugas</h5>
            <div className="col-6 text-end">
              <FontAwesomeIcon onClick={() => navigate('/bersamath/Tugas/create')} role='button' className='btn btn-success shadow' icon={faPlus} />
            </div>
          </div>
          <div className="table-responsive card-body">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                    <th>#</th>
                    <th>Tugas</th>
                    <th>Materi</th>
                </tr>
              </thead>
              <tbody>
                <tr role='button' onClick={() => navigate('/bersamath/tugas/1')}>
                  <td>1</td>
                  <td>Dasar-dasar matriks</td>
                  <td>Matriks</td>
                </tr>
                <tr role='button'  onClick={() => navigate('/bersamath/tugas/1')}>
                  <td>2</td>
                  <td>Bukan Dasar-dasar matriks</td>
                  <td>Matriks</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/tugas/1')}>
                  <td>3</td>
                  <td>Korelasi antara Matriks dan Pancasila</td>
                  <td>Matriks</td>
                </tr>
                <tr role='button'  onClick={() => navigate('/bersamath/tugas/1')}>
                  <td>4</td>
                  <td>Matriks dalam perkembangan teknologi di zaman perang dunia ke-2</td>
                  <td>Matriks</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/tugas/1')}>
                  <td>5</td>
                  <td>Perkembangan Matriks dengan teknologi AI</td>
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

import { faCalendarAlt, faStickyNote, faTasks } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function Student() {
  const [filter, setFilter] = useState("all")

  const param = useParams()
  const navigate = useNavigate()

  return (
    <div className='student p-3 overflow-hidden'>
      <div className="header row">
        <h1 className="title col-12 col-lg-6">Agensg</h1>
        <nav aria-label='breadcrumb' className='col-12 col-lg-6 d-block d-lg-flex justify-content-end align-items-center'>
          <ol className='breadcrumb'>
            <li role='button' onClick={() => navigate('/bersamath/kelas')} className="breadcrumb-item">Kelas</li>
            <li className="breadcrumb-item active">Agensg</li>
          </ol>
        </nav>
      </div>
      <div className="body mt-3">
        <div className="card-list row">
          <div className="col-12 col-lg-3 mb-3 mb-lg-0 pe-0">
            <Link to={'/bersamath/kelas'} className="card me-1">
              <div className="card-body">
                <div className="card-title text-main">
                  Tugas Diselesaikan
                </div>
                <div className="card-main text-second row">
                  <div className="col-6">
                    12/15
                  </div>
                  <div className="col-6 text-end">
                    <FontAwesomeIcon icon={faTasks} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-12 col-lg-3 mb-3 mb-lg-0 pe-0">
            <Link to={'/bersamath/materi'} className="card me-1">
              <div className="card-body">
                <div className="card-title text-main">
                  Rata-Rata Nilai
                </div>
                <div className="card-main text-second row">
                  <div className="col-6">
                    80%
                  </div>
                  <div className="col-6 text-end">
                    <FontAwesomeIcon icon={faStickyNote} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-12 col-lg-3 mb-3 mb-lg-0 pe-0">
            <Link to={'/bersamath/materi'} className="card me-1">
              <div className="card-body">
                <div className="card-title text-main">
                  Total Hari
                </div>
                <div className="card-main text-second row">
                  <div className="col-6">
                    20
                  </div>
                  <div className="col-6 text-end">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="row mt-5 mb-3 align-items-center">
          <h3 className="title text-main col-12 col-lg-6">Daftar Tugas</h3>
          <div className="col-lg-3"></div>
          <div className="col-12 col-lg-3 mt-2 mt-lg-0">
            <select name="filter" id="filter" onChange={(e) => setFilter(e.target.value)} className="form-select">
              <option value="all" selected={filter === "all"}>Semua</option>
              <option value="grade" selected={filter === "grade"}>Sudah dinilai</option>
              <option value="not" selected={filter === "not"}>Belum dinilai</option>
            </select>
          </div>
        </div>
        <div className="table-responsive card-body">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                  <th>#</th>
                  <th>Tugas</th>
                  <th>Materi</th>
                  <th>Nilai</th>
              </tr>
            </thead>
            <tbody>
              <tr role='button' onClick={() => navigate('/bersamath/xplorer/1/1')}>
                <td>1</td>
                <td>Dasar-dasar matriks</td>
                <td>Matriks</td>
                <td>90%</td>
              </tr>
              <tr role='button' className='row-danger'  onClick={() => navigate('/bersamath/xplorer/1/1')}>
                <td>2</td>
                <td>Bukan Dasar-dasar matriks</td>
                <td>Matriks</td>
                <td>60%</td>
              </tr>
              <tr role='button' onClick={() => navigate('/bersamath/xplorer/1/1')}>
                <td>3</td>
                <td>Korelasi antara Matriks dan Pancasila</td>
                <td>Matriks</td>
                <td>100%</td>
              </tr>
              <tr role='button' className='row-success'  onClick={() => navigate('/bersamath/xplorer/1/1')}>
                <td>4</td>
                <td>Matriks dalam perkembangan teknologi di zaman perang dunia ke-2</td>
                <td>Matriks</td>
                <td>80%</td>
              </tr>
              <tr className='table-danger' role='button' onClick={() => navigate('/bersamath/xplorer/1/1')}>
                <td>5</td>
                <td>Perkembangan Matriks dengan teknologi AI</td>
                <td>Matriks</td>
                <td>(Belum dinilai)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

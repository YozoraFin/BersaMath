import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PracticeDetail() {
    const [filter, setFilter] = useState('')
    const navigate = useNavigate()
  
    return (
      <div className='p-3'>
        <div className="header row">
          <h1 className="title col-12 col-lg-6">Tugas Gaming</h1>
          <nav aria-label='breadcrumb' className='col-12 col-lg-6 d-block d-lg-flex justify-content-end align-items-center'>
            <ol className='breadcrumb'>
              <li onClick={() => navigate('/bersamath/tugas')} className="breadcrumb-item">Tugas</li>
              <li className="breadcrumb-item active">Tugas Gaming</li>
            </ol>
          </nav>
        </div>
        <div className="body mt-3">
          <div className="card">
            <div className="card-header bg-main text-light">
                <div className="row">
                    <h5 className='card-title text-nowrap col-12 col-lg-6'>Daftar Xplorer</h5>
                    <div className="col-3"></div>
                    <div className="col-12 col-lg-3 my-3 my-lg-0">
                        <select name="filter" id="filter" onChange={(e) => setFilter(e.target.value)} className="form-select">
                            <option value="all" selected={filter === "all"}>Semua</option>
                            <option value="grade" selected={filter === "grade"}>Sudah dinilai</option>
                            <option value="none" selected={filter === "none"}>Belum dinilai</option>
                            <option value="active" selected={filter === "active"}>Aktif</option>
                            <option value="graduate" selected={filter === "graduate"}>Lulus</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="table-responsive card-body">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama</th>
                            <th>Nilai</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr role='button' onClick={() => navigate('/bersamath/xplorer/1/1')}>
                            <td>1</td>
                            <td>Ageng</td>
                            <td>80%</td>
                        </tr>
                        <tr role='button' className='row-danger'  onClick={() => navigate('/bersamath/xplorer/1/1')}>
                            <td>2</td>
                            <td>Alamak Ga Belajar</td>
                            <td>40%</td>
                        </tr>
                        <tr role='button' onClick={() => navigate('/bersamath/xplorer/1/1')}>
                            <td>3</td>
                            <td>Akresna</td>
                            <td>100%</td>
                        </tr>
                        <tr role='button' className='row-success'  onClick={() => navigate('/bersamath/xplorer/1/1')}>
                            <td>4</td>
                            <td>Anjayani</td>
                            <td>100%</td>
                        </tr>
                        <tr className='table-danger' role='button' onClick={() => navigate('/bersamath/xplorer/1/1')}>
                            <td>5</td>
                            <td>Ahmad madah</td>
                            <td>Belum dinilai</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
  )
}

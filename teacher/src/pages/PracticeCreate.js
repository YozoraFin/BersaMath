import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PracticeCreate() {
  const [title, setTitle] = useState('')
  const [maxScore, setMaxScore] = useState('')
  const [file, setFile] = useState()
  const navigate = useNavigate()

  return (
    <div className='p-3'>
      <div className="header row">
        <h1 className="title col-12 col-lg-6">Buat Tugas</h1>
        <nav aria-label='breadcrumb' className='col-12 col-lg-6 d-block d-lg-flex justify-content-end align-items-center'>
          <ol className='breadcrumb'>
            <li onClick={() => navigate('/bersamath/tugas')} className="breadcrumb-item">Tugas</li>
            <li className="breadcrumb-item active">Buat Tugas</li>
          </ol>
        </nav>
      </div>
      <div className="body mt-3 row">
        <div className="card col-12 col-lg-4 p-0">
          <div className="card-header bg-main text-light">
            <h4 className="card-title">Materi</h4>
          </div>
          <div className="card-body">
            <label className='form-label' htmlFor="judul"><h6>Judul</h6></label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="judul" id="judul" className='form-control mb-3' />

            <label className='form-label' htmlFor="max"><h6>Nilai Maksimal</h6></label>
            <input value={maxScore} onChange={(e) => setMaxScore(e.target.value)} type="text" name="max" id="max" className='form-control mb-3' />

            <label className='form-label' htmlFor="thumbnail"><h6>Thumbnail</h6></label>
            <input onChange={(e) => setFile(e.target.files[0])} type="file" name="thumbnail" id="thumbnail" className='form-control mb-3'/>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-12 text-end">
                <button className="btn btn-outline-success">
                  Perbarui
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Student() {
  const param = useParams()
  const navigate = useNavigate()

  return (
    <div className='student p-3'>
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
        
      </div>
    </div>
  )
}

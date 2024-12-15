import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Submission() {
  const param = useParams()
  const navigate = useNavigate()

  return (
    <div className="p-3">
      <div className="header row">
        <h1 className="col-12 col-lg-6 title">Dasar-Dasar Matriks</h1>
        <nav aria-label='breadcrumb' className="col-12 col-lg-6 d-block d-lg-flex justify-content-end align-items-center">
          <ol className="breadcrumb">
            <li role='button' onClick={() => navigate('/bersamath/kelas')} className="breadcrumb-item">Kelas</li>
            <li role='button' onClick={() => navigate('/bersamath/kelas/1')} className="breadcrumb-item">Agensg</li>
            <li className="breadcrumb-item active">Dasar-Dasar Matriks</li>
          </ol>
        </nav>
      </div>
      <div className="body mt-3">
        <table>
          <tr>
            <td><h6>Nama</h6></td>
            <td><h6>: Agensg</h6></td>
          </tr>
          <tr>
            <td><h6>Tugas</h6></td>
            <td><h6>: Dasar-Dasar Matriks</h6></td>
          </tr>
        </table>
        <div className="row">
          <div className="col-12 text-end">
          <button className="btn btn-outline-success">Nilai</button>
          </div>
        </div>
      </div>
    </div>
  )
}

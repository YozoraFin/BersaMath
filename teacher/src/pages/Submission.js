import { faFilePdf, faStickyNote } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Submission() {
  const param = useParams()
  const navigate = useNavigate()
  const swal = withReactContent(Swal)

  const handleGrading = () => {
    swal.fire({
      title: 'Masukan nilai!',
      input: 'number',
      icon: 'question',
      customClass: {
        input: 'text-end',
      }
    })
  }

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
        <div>
          <FontAwesomeIcon icon={faFilePdf} className='me-2 text-main'/>
          <a className='text-main' href="http://localhost:5000/public/uploads/content/dafpus.pdf" target='_blank'>Daftar Pustaka</a>
        </div>
        <div className="row">
          <div className="col-12 text-end">
            <button onClick={handleGrading} className="btn btn-outline-success">Nilai</button>
          </div>
        </div>
      </div>
    </div>
  )
}

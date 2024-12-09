import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Class() {
  const navigate = useNavigate()

  return (
    <div className="class p-3">
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
                <tr role='button' onClick={() => navigate('/bersamath/xplorer/1')}>
                  <td>1</td>
                  <td>Agengsz</td>
                  <td>08322313121231</td>
                  <td>Lah nyed</td>
                </tr>
                <tr role='button' className='row-danger'  onClick={() => navigate('/bersamath/xplorer/1')}>
                  <td>2</td>
                  <td>Ageng Nama Lengkap</td>
                  <td>08322313121231</td>
                  <td>Lah nyed kocak terus buat apa njir kalo gatau mau diisi apaan</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/xplorer/1')}>
                  <td>3</td>
                  <td>Agengsz Marah Besar 😠</td>
                  <td>08322313121231</td>
                  <td>Namae ya buat ngetes kalo misal elemennya over gimana makane tak buat nyoba nyoba njirrr</td>
                </tr>
                <tr role='button' className='row-success'  onClick={() => navigate('/bersamath/xplorer/1')}>
                  <td>4</td>
                  <td>Agengszz Nama Lengkap</td>
                  <td>08322313121231</td>
                  <td>Developer konflik batin njir</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/xplorer/1')}>
                  <td>6</td>
                  <td>Agengsz Protes</td>
                  <td>08322313121231</td>
                  <td>Ageng nama lengkap ws onk njirrr</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/xplorer/1')}>
                  <td>7</td>
                  <td>Agengsz ngakak abiis</td>
                  <td>Nomer 5 malah ilang wok 😭</td>
                  <td>08322313121231</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/xplorer/1')}>
                  <td>8</td>
                  <td>Ageng Nomer karo Komenmu ketuker njir</td>
                  <td>08322313121231</td>
                  <td>Lah nyed</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/xplorer/1')}>
                  <td>9</td>
                  <td>Agengsz Tidak Terima</td>
                  <td>08322313121231</td>
                  <td>Koe malah nak nama nyed</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/xplorer/1')}>
                  <td>100</td>
                  <td>Agengsz handrid</td>
                  <td>08322313121231</td>
                  <td>Hore 100</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/xplorer/1')}>
                  <td>101</td>
                  <td>Agengsz handrid and wan</td>
                  <td>08322313121231</td>
                  <td>Iki malah bablas</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/xplorer/1')}>
                  <td>102</td>
                  <td>Agengsz Jabar</td>
                  <td>08322313121231</td>
                  <td>わたしわ</td>
                </tr>
                <tr role='button' onClick={() => navigate('/bersamath/xplorer/1')}>
                  <td>-1000</td>
                  <td>Agen</td>
                  <td>08322313121231</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

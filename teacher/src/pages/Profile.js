import { faPencilAlt, faPenSquare } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useState } from 'react'

export default function Profile() {
  const [bio, setBio] = useState('')
  const [edit, setEdit] = useState(false)

  return (
    <div className="p-3">
      <div className="row">
        <img src="https://private-user-images.githubusercontent.com/90083018/239473639-6a1da2c4-e796-400c-b63a-28114246ef97.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzQxOTA3OTksIm5iZiI6MTczNDE5MDQ5OSwicGF0aCI6Ii85MDA4MzAxOC8yMzk0NzM2MzktNmExZGEyYzQtZTc5Ni00MDBjLWI2M2EtMjgxMTQyNDZlZjk3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMTQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjE0VDE1MzQ1OVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPThjOGI4YzUyNGU1NGE0YWMyYzAwYzg5YmRhN2Y3YWExYTFiMTg4NmZkZTFhZmQ1MDRlMTg0YTdmZWUxMWJkNmYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.aW7ErPMWZBzj6MfmYo95S7ln_u0_RxFmbJyJm7RikV8" alt="profil" className='rounded-circle col-6 col-lg-3' />

        <div className="col-12 col-lg-9">
          <h1 className='text-main mb-3'>Ageng Nama Lengkap</h1>
          <div className="info mb-2">
            <p className='m-0'>ageng@gmail.com</p>
          </div>
          <div className="info mb-3">
            <p className='m-0'>0811111111111111</p>
          </div>
        </div>
        <div className="col-12 border-top mt-4 pt-2">
          <div className="row mb-2">
            <h4 className='col-6'>Bio</h4>
            <span className='text-main col-6 text-end'><FontAwesomeIcon role='button' onClick={() => setEdit(!edit)} icon={faPencilAlt}/></span>
          </div>
          {
            edit
            ?
            <Fragment>
              <textarea rows={6} className='form-control' onChange={(e) => setBio(e.target.value)} name="bio" id="bio">
                {bio}
              </textarea>
              <div className="row">
                <div className="col-12 text-end">
                  <button className="btn btn-outline-success mt-3">Perbarui</button>
                </div>
              </div>
            </Fragment> 
            :

            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi et corrupti quia asperiores, magni non, recusandae cumque vel debitis tempora rem doloribus illo laborum quod error ut consequuntur! Alias perspiciatis eligendi autem assumenda quo quaerat quibusdam ut, modi sint voluptate dignissimos inventore neque hic voluptates odio consequuntur corporis, error praesentium ipsa maxime quia quasi odit! Et sapiente explicabo provident consequuntur.</p>
          }
        </div>
      </div>
    </div>
  )
}

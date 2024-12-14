import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player'

export default function LessonDetail() {
	const [link, setLink] = useState('')
	const [thumbnail, setThumbnail] = useState()
	const [preview, setPreview] = useState()
	const navigate = useNavigate()

	useEffect(() => {	
		if(!thumbnail) {
			setPreview(undefined)
			return
		}

		const objectUrl = URL.createObjectURL(thumbnail)

		console.log(objectUrl)
		setPreview(objectUrl)
		return () => URL.revokeObjectURL(objectUrl)
	}, [thumbnail])

	const selectFile = (e) => {
		if(!e.target.files || e.target.files.length === 0) {
			setThumbnail(undefined)
			return
		}
		setThumbnail(e.target.files[0])
	}

  return (
    <div className='course-detail p-3'>
		<div className="header row">
			<h1 className="title col-12 col-lg-6">Matriks Gaming</h1>
			<nav aria-label='breadcrumb' className='col-12 col-lg-6 d-block d-lg-flex justify-content-end align-items-center'>
				<ol className='breadcrumb'>
					<li role='button' onClick={() => navigate('/bersamath/materi')} className="breadcrumb-item">Materi</li>
					<li className="breadcrumb-item active">Matriks Gaming</li>
				</ol>
			</nav>
		</div>
		<div className="body mt-3">
			<div className="card">
				<div className="card-header bg-main text-light">
					<h4 className="card-title">Materi</h4>
				</div>
				<div className="card-body row">
					<div className="col-12 col-lg-4">
						<label className='form-label' htmlFor="judul"><h6>Judul</h6></label>
						<input type="text" name="judul" id="judul" className='form-control' />

						<label className='form-label mt-3' htmlFor="judul"><h6>Materi</h6></label>
						<select name="Materi" id="materi" className='form-select' disabled>
							<option value="1">Matriks</option>
						</select>

						<label className='form-label mt-3' htmlFor="deskripsi"><h6>Deskripsi</h6></label>
						<textarea name="deskripsi" id="deskripsi" className='form-control' rows={8}></textarea>
					</div>
					<div className="col-12 col-lg-4 mt-3 mt-lg-0">
						<label className='form-label' htmlFor="link"><h6>Link (Youtube)</h6></label>
						<input type="text" value={link} onChange={(e) => setLink(e.target.value)} name="judul" id="judul" className='form-control' />
						{
							link === ''
							? ''
							: 
							<div className="mt-3 rounded overflow-hidden">
								<ReactPlayer url={link} className='w-100' height={220} controls/>
							</div>
						}
					</div>
					<div className="col-12 col-lg-4 mt-3 mt-lg-0">
						<label className='form-label' htmlFor="thumbnail"><h6>Thumbnail</h6></label>
						<input onChange={selectFile} type="file" name="thumbnail" id="thumbnail" className='form-control'/>
						{
							preview
							? <img src={preview} alt="tamnel" className='mt-3 w-100' />
							: ''
							
						}
					</div>
				</div>
				<div className="card-footer row">
					<div className="col-12 text-end">
						<button className="btn btn-outline-primary">
							Perbarui
						</button>
					</div>
				</div>
			</div>
		</div>
    </div>
  )
}

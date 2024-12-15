import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Editor } from 'react-draft-wysiwyg'
import { ContentState, EditorState, convertFromHTML } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import api from '../api/Api';

export default function LessonDetail() {
	const [title, setTitle] = useState('')
	const [link, setLink] = useState('')
	const [file, setFile] = useState()
	const [text, setText] = useState(EditorState.createWithContent(
		ContentState.createFromBlockArray(
			convertFromHTML('<p></p>')
		)
	))
	const [thumbnail, setThumbnail] = useState()
	const [preview, setPreview] = useState()
	const [type, setType] = useState('video')
	const navigate = useNavigate()
	const param = useParams()

	const getDetail = () => { 
		api.get('api/v1/course/'+localStorage.getItem('course')+'/lesson/'+param.id+'/content?content_id='+param.id).then((res) => {
			const data = res.data?.data[0]
			setTitle(data?.lesson.title)
			setType(data?.content_type)
			if(data?.content_type === 'text') {
				setText(data?.content)
			} else if(data?.content_type === 'video') {
				setLink(data?.content_url)
			} else {

			}
		})
	}

	useEffect(() => {
		getDetail()
	}, [])

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

	const selectThumbnail = (e) => {
		if(!e.target.files || e.target.files.length === 0) {
			setThumbnail(undefined)
			return
		}
		setThumbnail(e.target.files[0])
	}

  return (
    <div className='p-3'>
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
				<div className="card-body">
					<div className="row">
						<div className="col-12 col-lg-4">
							<label className='form-label' htmlFor="judul"><h6>Judul</h6></label>
							<input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="judul" id="judul" className='form-control' />

							<label className='form-label mt-3' htmlFor="judul"><h6>Materi</h6></label>
							<select name="Materi" id="materi" className='form-select' disabled>
								<option value="1">Matriks</option>
							</select>

							<label className='form-label mt-3' htmlFor="judul"><h6>Tipe</h6></label>
							<select value={type} onChange={(e) => setType(e.target.value)} name="Materi" id="materi" disabled className='form-select'>
								<option value="video">Video</option>
								<option value="teks">Teks</option>
								<option value="file">File</option>
							</select>

							<label className='form-label mt-3' htmlFor="deskripsi"><h6>Deskripsi</h6></label>
							<textarea name="deskripsi" id="deskripsi" className='form-control' rows={8}></textarea>
						</div>
						<div className="col-12 col-lg-4 mt-3 mt-lg-0">
							{
								type === 'video'
								?
								<Fragment>
									<label className='form-label' htmlFor="link"><h6>Link (Youtube)</h6></label>
									<input type="text" value={link} onChange={(e) => setLink(e.target.value)} name="link" id="link" className='form-control' />
									{
										link === ''
										? ''
										: 
										<div className="mt-3 rounded overflow-hidden">
											<ReactPlayer url={link} className='w-100' height={220} controls/>
										</div>
									}
								</Fragment>
								: type === 'file'
								? 
								<Fragment>
									<label className='form-label' htmlFor="file"><h6>File Materi</h6></label>
									<input onChange={(e) => {setFile(e.target.files[0])}} type="file" name="file" id="file" className='form-control'/>
								</Fragment>
								:
								<Fragment>
									<label className='form-label' htmlFor="text"><h6>Text</h6></label>
									<Editor
										editorClassName='form-control'
										editorState={text}
										editorStyle={{ height: '300px' }}
										onEditorStateChange={setText}
									/>
								</Fragment>
							}
						</div>
						<div className="col-12 col-lg-4 mt-3 mt-lg-0">
							<label className='form-label' htmlFor="thumbnail"><h6>Thumbnail</h6></label>
							<input onChange={selectThumbnail} type="file" accept='image/*' name="thumbnail" id="thumbnail" className='form-control'/>
							{
								preview
								? <img src={preview} alt="Pastikan thumbnail berisi gambar!" className='mt-3 w-100' />
								: ''
								
							}
						</div>
					</div>
				</div>
				<div className="card-footer">
					<div className="row">
						<div className="col-12 text-end">
							<button className="btn btn-outline-primary">
								Perbarui
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="card mt-5">
				<div className="card-header bg-main text-light">
					<h5 className='card-title text-nowrap'>Daftar Diskusi</h5>
				</div>
				<div className="table-responsive card-body">
					<table className="table table-hover table-bordered">
						<thead>
							<tr>
								<th>#</th>
								<th>Judul</th>
								<th>Xplorer</th>
							</tr>
						</thead>
						<tbody>
							<tr role='button' onClick={() => navigate('/bersamath/diskusi/1')}>
								<td>1</td>
								<td>Ini mksd ap y</td>
								<td>Adya</td>
							</tr>
							<tr role='button' onClick={() => navigate('/bersamath/diskusi/1')}>
								<td>2</td>
								<td>Ini jg mksh</td>
								<td>Akra</td>
							</tr>
							<tr role='button' onClick={() => navigate('/bersamath/diskusi/1')}>
								<td>3</td>
								<td>Filosofi Matriks</td>
								<td>Matriks</td>
							</tr>
							<tr role='button' onClick={() => navigate('/bersamath/diskusi/1')}>
								<td>4</td>
								<td>Matriks dan Dinamika Pancasila</td>
								<td>Matriks</td>
							</tr>
							<tr role='button' onClick={() => navigate('/bersamath/diskusi/1')}>
								<td>6</td>
								<td>Matriks sebagai Sistem Etika</td>
								<td>Matriks</td>
							</tr>
							<tr role='button' onClick={() => navigate('/bersamath/diskusi/1')}>
								<td>7</td>
								<td>Matriks sebagai Dasar Penelitian</td>
								<td>Matriks</td>
							</tr>
							<tr role='button' onClick={() => navigate('/bersamath/diskusi/1')}>
								<td>8</td>
								<td>Matriks dan Perkembangan Manusia</td>
								<td>Matriks</td>
							</tr>
							<tr role='button' onClick={() => navigate('/bersamath/diskusi/1')}>
								<td>9</td>
								<td>Matriks dan Pengaruhnya dalam Kehidupan Sosial</td>
								<td>Matriks</td>
							</tr>
							<tr role='button' onClick={() => navigate('/bersamath/diskusi/1')}>
								<td>100</td>
								<td>Matriks dan Ilmu Politik</td>
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

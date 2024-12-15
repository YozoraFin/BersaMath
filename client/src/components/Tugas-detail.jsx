import { useParams, useNavigate } from 'react-router-dom';
import tugas from '../assets/json/tugas-aljabar.json';
import { useState } from 'react';

export default function TugasDetail({ selectedSubject }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [submittedFile, setSubmittedFile] = useState(null);

    const selectedTask = tugas.find(task => task.title.toLowerCase().replace(/\s/g, '-') === id && task.subject.toLowerCase() === selectedSubject.toLowerCase());

    if (!selectedTask) {
        return <div>Tugas tidak ditemukan</div>;
    }

    const nextTaskIndex = tugas.findIndex(task => task.title.toLowerCase().replace(/\s/g, '-') === id && task.subject.toLowerCase() === selectedSubject.toLowerCase()) + 1;
    const nextTaskId = nextTaskIndex < tugas.length ? tugas[nextTaskIndex].title.toLowerCase().replace(/\s/g, '-') : null;

    const handleFileChange = (e) => {
        setSubmittedFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(submittedFile);
    };

    return (
        <div className='d-flex flex-column min-height p-5'>
            <h1 className='mb-4'>{selectedTask.title}</h1>
            <div className='d-flex justify-content-center gap-5'>
                <div className='card shadow-lg' style={{ width: '300px' }}>
                    <div className='card-body'>
                        <p className='card-text'>{selectedTask.description}</p>
                        <a href={selectedTask.file} download className='btn btn-primary rounded-pill'>
                            Unduh
                        </a>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='card shadow-lg' style={{ width: '300px' }}>
                    <div className='card-body'>
                        <div className='mb-3 fw-bold'>
                            <label htmlFor='submission' className='form-label'>
                                Unggah Jawaban
                            </label>
                            <input type='file' className='form-control' id='submission' onChange={handleFileChange} />
                        </div>
                        <button type='submit' className='btn btn-primary rounded-pill'>
                            Kumpulkan
                        </button>
                    </div>
                </form>
            </div>
            {nextTaskId && (
                <div className='d-flex justify-content-center mt-5'>
                    <button className='btn btn-secondary rounded-pill' onClick={() => navigate(`/tugas/${nextTaskId}`)}>
                        Lanjut
                    </button>
                </div>
            )}
        </div>
    );
}
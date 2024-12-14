import { useParams, useNavigate } from 'react-router-dom';
import materi from '../assets/json/materi.json';

export default function Subject() {
    const { id } = useParams();
    const navigate = useNavigate();
    const subject = materi.find((subject) => subject.title.toLowerCase() === id);

    if (!subject) {
        return <div>Materi tidak ditemukan</div>;
    }

    const nextSubject = materi.find((subjek, index) => subjek.title.toLowerCase() === id && index < materi.length - 1);
    const nextSubjectId = nextSubject ? materi[materi.indexOf(nextSubject) + 1].title.toLowerCase() : null;

    return (
        <div className='margin d-flex flex-column min_height'>
            <h1 className='mb-4'>{subject.title}</h1>
            <div className='d-flex justify-content-center gap-5'>
                <iframe
                    title={subject.title}
                    width="1280"
                    height="720"
                    src={`https://www.youtube.com/embed/${subject.video}?origin=${window.location.origin}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className='mr-4'
                ></iframe>
                <div className='card shadow-lg' style={{ width: '300px' }}>
                    <div className='card-body'>
                        <p className='card-text'>{subject.description}</p>
                        {nextSubjectId && (
                            <button
                                className='btn btn-primary rounded-pill position-absolute bottom-0 end-0 mb-3 me-3 px-3'
                                onClick={() => navigate(`/materi/${nextSubjectId}`)}
                            >
                                Lanjut
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
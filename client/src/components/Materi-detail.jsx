import { useParams, useNavigate } from 'react-router-dom';
import aljabar from '../assets/json/materi-aljabar.json';
import geometri from '../assets/json/materi-geometri.json';
import kalkulus from '../assets/json/materi-kalkulus.json';

export default function Subjek() {
    const { subject, difficulty, id } = useParams();
    const navigate = useNavigate();

    const subjectMap = {
        aljabar: aljabar,
        geometri: geometri,
        kalkulus: kalkulus,
    };

    const selectedContent = subjectMap[subject] || [];
    const filteredContent = selectedContent.filter(sub => sub.difficulty.toLowerCase() === difficulty);
    const selectedSubject = filteredContent.find(sub => sub.title.toLowerCase() === id);

    if (!selectedSubject) {
        return <div>Materi tidak ditemukan</div>;
    }

    const nextSubjectIndex = filteredContent.findIndex(sub => sub.title.toLowerCase() === id) + 1;
    const nextSubjectId = nextSubjectIndex < filteredContent.length ? filteredContent[nextSubjectIndex].title.toLowerCase() : null;

    return (
        <div className='d-flex flex-column min-height p-5'>
            <h1 className='mb-4'>{selectedSubject.title}</h1>
            <div className='d-flex justify-content-center gap-5'>
                <iframe
                    title={selectedSubject.title}
                    width="1280"
                    height="720"
                    src={`https://www.youtube.com/embed/${selectedSubject.video}?origin=${window.location.origin}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className='mr-4'
                ></iframe>
                <div className='card shadow-lg' style={{ width: '300px' }}>
                    <div className='card-body'>
                        <p className='card-text'>{selectedSubject.description}</p>
                        {nextSubjectId && (
                            <button
                                className='btn btn-primary rounded-pill position-absolute bottom-0 end-0 mb-3 me-3 px-3'
                                onClick={() => navigate(`/materi/${subject}/${difficulty}/${nextSubjectId}`)}
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

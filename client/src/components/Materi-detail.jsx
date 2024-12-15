import { Link, useParams, useNavigate } from 'react-router-dom';
import aljabar from '../assets/json/materi-aljabar.json';
import geometri from '../assets/json/materi-geometri.json';
import kalkulus from '../assets/json/materi-kalkulus.json';
import diskusi from '../assets/json/diskusi.json';

export default function Subjek() {
    const { subject, id } = useParams();
    const navigate = useNavigate();

    const subjectMap = {
        aljabar: aljabar,
        geometri: geometri,
        kalkulus: kalkulus
    };

    const selectedContent = subjectMap[subject] || [];
    const selectedSubject = selectedContent.find(sub => sub.title.toLowerCase() === id);

    if (!selectedSubject) {
        return <div>Materi tidak ditemukan</div>;
    }

    const nextSubjectIndex = selectedContent.findIndex(sub => sub.title.toLowerCase() === id) + 1;
    const nextSubjectId = nextSubjectIndex < selectedContent.length ? selectedContent[nextSubjectIndex].title.toLowerCase() : null;

    return (
        <div className='d-flex flex-column min-height p-5'>
            <h1 className='mb-4'>{selectedSubject.title}</h1>
            <div>
                {selectedSubject.type === "Video" && (
                    <div>
                        <div className='row justify-content-center gap-5'>
                            <iframe
                                title={selectedSubject.title}
                                width="1280"
                                height="720"
                                src={`https://www.youtube.com/embed/${selectedSubject.source}?origin=${window.location.origin}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className='mr-4 col-8'
                            ></iframe>
                            <div className='card shadow-lg col-2'>
                                <div className='card-body'>
                                    <p className='card-text'>{selectedSubject.description}</p>
                                    {nextSubjectId && (
                                        <button
                                            className='btn btn-primary rounded-pill position-absolute bottom-0 end-0 mb-3 me-3 px-3'
                                            onClick={() => navigate(`/materi/${subject}/${nextSubjectId}`)}
                                        >
                                            Lanjut
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className='card shadow-lg col-10'>
                                <div className='card-body'>
                                    <h3 className='card-text pb-3 fw-bolder'>Diskusi</h3>
                                    <div className="border"></div>
                                    <button
                                        className='btn btn-primary rounded-circle position-absolute top-0 end-0 mt-3 me-3'
                                        onClick={() => navigate(`/materi/${subject}/${id}/discussion-add`)}
                                    >
                                        +
                                    </button>
                                    <div className="list-group list-discussion mt-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                        {diskusi.map((discussion, index) => (
                                            <Link to={`/materi/${subject}/${id}/discussion/${index}`} className="list-group-item list-group-item-action" key={index}>
                                                <h5 className="mb-1">{discussion.title}</h5>
                                                <p className="mb-1">{discussion.discussion}</p>
                                                <small>{discussion.sender} - {discussion.date}</small>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {selectedSubject.type === "File" && (
                    <div className='d-flex justify-content-center gap-5'>
                        <div className='card shadow-lg' style={{ width: '300px' }}>
                            <div className='card-body'>
                                <p className='card-text'>{selectedSubject.description}</p>
                                <div className="justify-content-between d-flex">
                                    <a href={selectedSubject.source} download className='btn btn-primary rounded-pill'>
                                        Download File
                                    </a>
                                    {nextSubjectId && (
                                    <button
                                        className='btn btn-primary rounded-pill'
                                        onClick={() => navigate(`/materi/${subject}/${nextSubjectId}`)}
                                    >
                                        Lanjut
                                    </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {selectedSubject.type === "Lesson" && (
                    <div className='d-flex justify-content-center gap-5'>
                        <div className='card shadow-lg' style={{ width: '1800px' }}>
                            <div className='card-body'>

                                {nextSubjectId && (
                                    <div className="row">
                                        <div className="col-12 text-end">
                                            <button
                                                className='btn btn-primary rounded-pill'
                                                onClick={() => navigate(`/materi/${subject}/${nextSubjectId}`)}
                                            >
                                                Lanjut
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

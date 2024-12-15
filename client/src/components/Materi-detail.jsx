import { useParams, useNavigate } from 'react-router-dom';
import materi from '../assets/json/materi.json';

export default function Subjek() {
<<<<<<< HEAD
    const { id } = useParams();
=======
    const { subject, id } = useParams();
>>>>>>> a3e01d6433c45766c52edc7386fdc360ef108362
    const navigate = useNavigate();
    const subject = materi.find((subject) => subject.title.toLowerCase() === id);

<<<<<<< HEAD
    if (!subject) {
        return <div>Materi tidak ditemukan</div>;
    }

    const nextSubjectIndex = materi.findIndex((subjek) => subjek.title.toLowerCase() === id) + 1;
    const nextSubjectId = nextSubjectIndex < materi.length ? materi[nextSubjectIndex].title.toLowerCase() : null;
=======
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
>>>>>>> a3e01d6433c45766c52edc7386fdc360ef108362

    return (
        <div className='d-flex flex-column min-height p-5'>
            <h1 className='mb-4'>{subject.title}</h1>
            <div className='d-flex justify-content-center gap-5'>
<<<<<<< HEAD
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
=======
                {selectedSubject.type === "Video" && (
                    <>
                        <iframe
                            title={selectedSubject.title}
                            width="1280"
                            height="720"
                            src={`https://www.youtube.com/embed/${selectedSubject.source}?origin=${window.location.origin}`}
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
                                    onClick={() => navigate(`/materi/${subject}/${nextSubjectId}`)}
                                >
                                    Lanjut
                                </button>
                            )}
                        </div>
>>>>>>> a3e01d6433c45766c52edc7386fdc360ef108362
                    </div>
                    </>
                )}
                {selectedSubject.type === "File" && (
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
                )}
                {selectedSubject.type === "Lesson" && (
                    <div className='card shadow-lg' style={{ width: '300px' }}>
                        <div className='card-body'>
                            <p className='card-text'>{selectedSubject.description}</p>
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
                )}
            </div>
        </div>
    );
}

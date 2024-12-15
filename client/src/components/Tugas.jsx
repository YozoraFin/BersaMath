import { useParams, useNavigate } from 'react-router-dom';
import tugas from '../assets/json/tugas-aljabar.json';

export default function Tugas({ selectedSubject }) {
    const navigate = useNavigate();
    const filteredTugas = tugas.filter(task => task.subject.toLowerCase() === selectedSubject.toLowerCase());

    return (
        <div className="min-height p-5">
            <div className="container">
                <h1 className="mb-4">Tugas {selectedSubject}</h1>
                <div className="row">
                    {filteredTugas.map((task, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card card-animation">
                                <div className="card-body">
                                    <h5 className="card-title">{task.title}</h5>
                                    <p className="card-text">{task.description}</p>
                                    <p className="card-text"><small className="text-muted">Deadline: {task.deadline}</small></p>
                                    <button className="btn btn-primary" onClick={() => navigate(`/tugas/${task.title.toLowerCase().replace(/\s/g, '-')}`)}>Lihat</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

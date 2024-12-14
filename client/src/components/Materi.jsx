import { Link } from 'react-router-dom';
import materi from '../assets/json/materi.json';

export default function Materi() {

    return (
        <div className="min-height p-5">
            <div className="container">
                <h1 className="mb-4">Materi Matematika</h1>
                <div className="row grid-container">
                    {materi.map((subject, index) => (
                        <div className="grid-item" key={index}>
                            <Link to={`/materi/${subject.title.toLowerCase()}`} className="card-link">
                                <div className="card d-flex flex-row">
                                    <img src="assets/img/aljabar.png" alt="Image" className="card-img-left" />
                                    <div className="card-body flex-grow-1 d-flex flex-column">
                                        <h5 className="card-title">{subject.title}</h5>
                                        <p className="card-text">{subject.short_description}</p>
                                        <p className="card-text"><small className="text-muted">{subject.time}</small></p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
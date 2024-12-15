import { Link, useParams } from 'react-router-dom';
import aljabar from '../assets/json/materi-aljabar.json';
import geometri from '../assets/json/materi-geometri.json';
import kalkulus from '../assets/json/materi-kalkulus.json';

export default function Materi() {
    const { subject, difficulty } = useParams();

    const subjectMap = {
        aljabar: aljabar,
        geometri: geometri,
        kalkulus: kalkulus,
    };

    const selectedContent = subjectMap[subject] || [];
    const validDifficulty = difficulty ? difficulty.toLowerCase() : '';
    const filteredContent = selectedContent.filter(sub => sub.difficulty.toLowerCase() === validDifficulty);

    return (
        <div className="min-height p-5">
            <div className="container">
                <h1 className="mb-4">Materi {subject.charAt(0).toUpperCase() + subject.slice(1)} - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h1>
                <div className="row grid-container">
                    {filteredContent.map((sub, index) => (
                        <div className="grid-item" key={index}>
                            <Link to={`/materi/${subject}/${difficulty}/${sub.title.toLowerCase()}`} className="card-link">
                                <div className="card d-flex flex-row">
                                    <img src="/assets/img/aljabar.png" alt="Image" className="card-img-left" />
                                    <div className="card-body flex-grow-1 d-flex flex-column">
                                        <h5 className="card-title">{sub.title}</h5>
                                        <p className="card-text">{sub.short_description}</p>
                                        <p className="card-text"><small className="text-muted">{sub.time}</small></p>
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

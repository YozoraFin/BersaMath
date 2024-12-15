import { Link } from 'react-router-dom';
import materi from '../assets/json/materi.json';

export default function Materi() {
<<<<<<< HEAD
=======
    const { subject } = useParams();

    const subjectMap = {
        aljabar: aljabar,
        geometri: geometri,
        kalkulus: kalkulus
    };

    const selectedContent = subjectMap[subject] || [];
>>>>>>> a3e01d6433c45766c52edc7386fdc360ef108362

    return (
        <div className="min-height p-5">
            <div className="container">
<<<<<<< HEAD
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
=======
                <h1 className="mb-4">Materi {subject.charAt(0).toUpperCase() + subject.slice(1)}</h1>
                <div className="row grid-container">
                    {selectedContent.map((sub, index) => (
                        <div className="grid-item" key={index}>
                            <Link to={`/materi/${subject}/${sub.title.toLowerCase()}`} className="card-link">
                                <div className="card card-animation d-flex flex-row">
                                    <img src={sub.img} alt="Image" className="card-img-left" />
                                    <div className="card-body flex-grow-1 d-flex flex-column">
                                        <h5 className="card-title">{sub.title}</h5>
                                        <p className="card-text">{sub.short_description}</p>
                                        <p className="card-text"><small className="text-muted">{sub.type}</small></p>
>>>>>>> a3e01d6433c45766c52edc7386fdc360ef108362
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
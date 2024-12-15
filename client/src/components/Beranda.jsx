import { Link, useParams } from 'react-router-dom';
import aljabar from '../assets/json/materi-aljabar.json';
import geometri from '../assets/json/materi-geometri.json';
import kalkulus from '../assets/json/materi-kalkulus.json';
import tugas from '../assets/json/tugas-aljabar.json';
import Swiper from './Swiper.jsx';

export default function Beranda({ user }) {
    const { subject = 'aljabar' } = useParams();

    const subjectMap = {
        aljabar: aljabar,
        geometri: geometri,
        kalkulus: kalkulus
    };

    const selectedSubject = subjectMap[subject] || [];
    const filteredTugas = tugas.filter(task => task.subject.toLowerCase() === subject.toLowerCase());

    return (
        <div className="min-height">
            <Swiper />
            <div className="container border border-white shadow-lg rounded-3 my-5 justify-content-center align-items-center">
                <div className="d-flex m-5">
                    <div className="me-3">
                        <img src={user.profilePicture} className="rounded-3" alt="Profile" width="200" height="200" />     
                    </div>
                    <div>
                        <h1 className="mb-5">Selamat datang, {user.username}!</h1>
                        <div className="d-flex wrapper-task">
                            {filteredTugas.map((task, index) => (
                                <div className="card card-animation mx-2 ongoing border rounded-3" key={index}>
                                    <Link to={`/tugas/${task.title.toLowerCase().replace(/\s/g, '-')}`} className="card-link">
                                        <div className="card-body">
                                            <h5>{task.title}</h5>
                                            <p className='text-truncate'>{task.description}</p>
                                            <p><small className="text-muted">Deadline: {task.deadline}</small></p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container border border-white shadow-lg rounded-3 my-5">
                <div className="m-5">
                    <h1 className="mb-4">Materi</h1>
                        <div className="d-flex wrapper-sbj">
                            {selectedSubject.map((subjek, index) => (
                                <div className="card card-animation mx-2 ongoing border rounded-3" key={index}>
                                    <Link to={`/materi/${subject}/${subjek.title.toLowerCase()}`} className="card-link">
                                        <div className="card-body">
                                            <h5>{subjek.title}</h5>
                                            <p className='text-truncate'>{subjek.short_description}</p>
                                            <p><small className="text-muted">{subjek.type}</small></p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                </div>
            </div>
        </div>
    );
}

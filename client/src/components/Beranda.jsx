import { Link } from 'react-router-dom';
import materi from '../assets/json/materi.json';
import Swiper from './Swiper.jsx';

<<<<<<< HEAD
export default function Beranda() {
=======
export default function Beranda({ user }) {
    const { subject = 'aljabar' } = useParams();

    const subjectMap = {
        aljabar: aljabar,
        geometri: geometri,
        kalkulus: kalkulus
    };

    const selectedSubject = subjectMap[subject] || [];

>>>>>>> a3e01d6433c45766c52edc7386fdc360ef108362
    const tugas = [
        { title: "Tugas 1: Aljabar", description: "Kerjakan aljabar", deadline: "2024-12-15" },
        { title: "Tugas 2: Geometri", description: "Kerjakan geometri", deadline: "2024-12-20" },
        { title: "Tugas 3: Kalkulus", description: "Kerjakan kalkulus", deadline: "2024-12-25" },
        { title: "Tugas 4: Statistik", description: "Kerjakan statistik", deadline: "2024-12-30" },
        { title: "Tugas 5: Trigonometri", description: "Kerjakan trigonometri", deadline: "2025-01-05" },
    ];

    const guru = [
        { name: "Yanto", subject: materi[0].title, class: "A" },
        { name: "Sahari", subject: materi[1].title, class: "A" },
        { name: "Mabrur", subject: materi[2].title, class: "A" },
        { name: "Imamul", subject: materi[3].title, class: "A" },
        { name: "Firman", subject: materi[4].title, class: "A" },
    ];

    return (
        <div className="min-height">
            <Swiper />
            <div className="container border border-white shadow-lg rounded-3 my-5 justify-content-center align-items-center">
                <div className="d-flex m-5">
                    <div className="me-3">
                        <img src={user.profilePicture} className="rounded-3" alt="Profile" width="200" height="200" />     
                    </div>
                    <div>
<<<<<<< HEAD
                        <h1 className="mb-5">Selamat datang, Kopling!</h1>
=======
                        <h1 className="mb-5">Selamat datang, {user.username}!</h1>
>>>>>>> a3e01d6433c45766c52edc7386fdc360ef108362
                        <div className="d-flex wrapper-task">
                            {tugas.map((task, index) => (
                                <div className="card mx-2 ongoing border rounded-3" key={index}>
                                    <div className="card-body">
                                        <h5>{task.title}</h5>
                                            <p>Deadline: {task.deadline}</p>
                                    </div>    
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
<<<<<<< HEAD
                            {materi.map((subjek, index) => (
                                <div className="card mx-2 ongoing border rounded-3" key={index}>
                                    <Link to={`/materi/${subjek.title.toLowerCase()}`} className="card-link">
=======
                            {selectedSubject.map((subjek, index) => (
                                <div className="card mx-2 ongoing border rounded-3" key={index}>
                                    <Link to={`/materi/${subject}/${subjek.title.toLowerCase()}`} className="card-link">
>>>>>>> a3e01d6433c45766c52edc7386fdc360ef108362
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
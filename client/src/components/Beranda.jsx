import { Link } from 'react-router-dom';
import materi from '../assets/json/materi.json';
import Swiper from './Swiper.jsx';

export default function Beranda() {
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
            <div className="container border border-white shadow-lg rounded-3 my-5">
                <div className="d-flex m-5">
                    <div className="me-3">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBdTFjHTSEiiT-C59g1Q6VZyxukFwcy-NRrA&s" className="rounded-3" alt="" />     
                    </div>
                    <div>
                        <h1 className="mb-5">Selamat datang, Kopling!</h1>
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
                            {materi.map((subjek, index) => (
                                <div className="card mx-2 ongoing border rounded-3" key={index}>
                                    <Link to={`/materi/${subjek.title.toLowerCase()}`} className="card-link">
                                        <div className="card-body">
                                            <h5>{subjek.title}</h5>
                                                <p className='text-truncate'>{subjek.short_description}</p>
                                            <p><small className="text-muted">{subjek.time}</small></p>
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
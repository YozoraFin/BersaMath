import { Link } from 'react-router-dom';

export default function Materi() {
    const subjek = [
        { title: "Aljabar", description: "Pelajari aljabar", time: "10:00 - 12:00", path: "/aljabar" },
        { title: "Geometri", description: "Pelajari geometri", time: "13:00 - 15:00", path: "/geometri" },
        { title: "Kalkulus", description: "Pelajari kalkulus", time: "15:00 - 17:00", path: "/kalkulus" },
        { title: "Statistik", description: "Pelajari statistik", time: "09:00 - 11:00", path: "/statistik" },
        { title: "Trigonometri", description: "Pelajari trigonometri", time: "11:00 - 13:00", path: "/trigonometri" },
    ];

    return (
        <div className="margin">
            <div className="container mt-5">
                <h1 className="mb-4">Materi Matematika</h1>
                <div className="row">
                    {subjek.map((subject, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <Link to={subject.path} className="card-link">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{subject.title}</h5>
                                        <p className="card-text">{subject.description}</p>
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
import { Link } from 'react-router-dom';

export default function Beranda() {
    const tugas = [
        { title: "Tugas 1: Aljabar", description: "Kerjakan aljabar", deadline: "2024-12-15" },
        { title: "Tugas 2: Geometri", description: "Kerjakan geometri", deadline: "2024-12-20" },
        { title: "Tugas 3: Kalkulus", description: "Kerjakan kalkulus", deadline: "2024-12-25" },
        { title: "Tugas 4: Statistik", description: "Kerjakan statistik", deadline: "2024-12-30" },
        { title: "Tugas 5: Trigonometri", description: "Kerjakan trigonometri", deadline: "2025-01-05" },
    ];

    const subjek = [
        { title: "Aljabar", description: "Pelajari aljabar", time: "10:00 - 12:00" },
        { title: "Geometri", description: "Pelajari geometri", time: "13:00 - 15:00" },
        { title: "Kalkulus", description: "Pelajari kalkulus", time: "15:00 - 17:00" },
        { title: "Statistik", description: "Pelajari statistik", time: "09:00 - 11:00" },
        { title: "Trigonometri", description: "Pelajari trigonometri", time: "11:00 - 13:00" },
    ];

    const guru = [
        { name: "Yanto", subject: subjek[0].title, class: "A" },
        { name: "Sahari", subject: subjek[1].title, class: "A" },
        { name: "Mabrur", subject: subjek[2].title, class: "A" },
        { name: "Imamul", subject: subjek[3].title, class: "A" },
        { name: "Firman", subject: subjek[4].title, class: "A" },
    ];

    return (
        <div className="margin">
            <div className="container border rounded-3 mb-5">
                <div className="d-flex m-5">
                    <div className="me-3">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBdTFjHTSEiiT-C59g1Q6VZyxukFwcy-NRrA&s" className="rounded-3" alt="" />     
                    </div>
                    <div>
                        <h1 className="mb-5">Selamat datang, Kopling!</h1>
                        <div className="d-flex wrapper_task">
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
            <div className="container border rounded-3 mb-5">
                <div className="m-5">
                    <h1 className="mb-4">Materi</h1>
                    <div className="d-flex wrapper_sbj">
                        {subjek.map((sbj, index) => (
                            <div className="card mx-2 ongoing border rounded-3" key={index}>
                                <div className="card-body">
                                    <h5>{sbj.title}</h5>
                                    <p>{sbj.description}</p>
                                    <p><small className="text-muted">{sbj.time}</small></p>
                                </div>    
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="container border rounded-3 mb-5">
                <div className="m-5">
                    <h1 className="mb-4">Guru Pengampu</h1>
                    <div className="d-flex wrapper_sbj">
                        {guru.map((dosen, index) => (
                            <div className="card mx-2 ongoing border rounded-3" key={index}>
                                <div className="card-body">
                                    <h5>{dosen.name}</h5>
                                    <p>{dosen .subject}</p>
                                    <p><small className="text-muted">Kelas : {dosen.class}</small></p>
                                </div>    
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
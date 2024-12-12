export default function Tugas() {
    const tugas = [
        { title: "Tugas 1: Aljabar", description: "Kerjakan aljabar", deadline: "2024-12-15" },
        { title: "Tugas 2: Geometri", description: "Kerjakan geometri", deadline: "2024-12-20" },
        { title: "Tugas 3: Kalkulus", description: "Kerjakan kalkulus", deadline: "2024-12-25" },
        { title: "Tugas 4: Statistik", description: "Kerjakan statistik", deadline: "2024-12-30" },
        { title: "Tugas 5: Trigonometri", description: "Kerjakan trigonometri", deadline: "2025-01-05" },
    ];

    return (
        <div className="margin min_height">
            <div className="container mt-5">
                <h1 className="mb-4">Tugas Matematika</h1>
                <div className="row">
                    {tugas.map((task, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{task.title}</h5>
                                    <p className="card-text">{task.description}</p>
                                    <p className="card-text"><small className="text-muted">Deadline: {task.deadline}</small></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
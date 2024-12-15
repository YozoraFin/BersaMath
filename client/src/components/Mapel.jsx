import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
import mapel from '../assets/json/mapel.json';

export default function SubjectSelection({ onSelectSubject }) {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const handleSelectSubject = (subject) => {
        onSelectSubject(subject);
        navigate(`/beranda/${subject.title.toLowerCase()}`);
    };

    const checkConfirm = (subject) => {
        MySwal.fire({
            title: "Apa kamu yakin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                MySwal.fire({
                    title: "Menuju ke kelas anda!",
                    text: "Selamat belajar!",
                    icon: "success",
                }).then(() => {
                    handleSelectSubject(subject);
                });
            }
        });
    };

    const difficulties = {
        mudah: [],
        sedang: [],
        susah: []
    };

    mapel.forEach(subject => {
        if (subject.difficulty.toLowerCase() === 'mudah') {
            difficulties.mudah.push(subject);
        } else if (subject.difficulty.toLowerCase() === 'sedang') {
            difficulties.sedang.push(subject);
        } else if (subject.difficulty.toLowerCase() === 'susah') {
            difficulties.susah.push(subject);
        }
    });

    return (
        <div className="min-height p-5">
            <div className="container">
                <h1 className="mb-4">Mau belajar apa nih?</h1>
                {Object.keys(difficulties).map((difficulty) => (
                    <div key={difficulty} className="mb-4">
                        <h4 className="mb-3">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h4>
                        <div className="row grid-container">
                            {difficulties[difficulty].map((subject, index) => (
                                <div className="grid-item" key={index} onClick={() => checkConfirm(subject)}>
                                    <div className="card card-animation d-flex flex-row">
                                        <img src={subject.img} alt="Image" className="card-img-left" />
                                        <div className="card-body flex-grow-1 d-flex flex-column card-subject">
                                            <h5 className="card-title">{subject.title}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

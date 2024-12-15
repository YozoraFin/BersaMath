import React from 'react';
import { useNavigate } from 'react-router-dom';
import mapel from '../assets/json/mapel.json';

export default function SubjectSelection({ onSelectSubject }) {
    const navigate = useNavigate();

    const handleSelectSubject = (subject) => {
        onSelectSubject(subject);
        navigate(`/beranda/${subject.title.toLowerCase()}/${subject.difficulty.toLowerCase()}`);
    };

    return (
        <div className="min-height p-5">
            <div className="container">
                <h1 className="mb-4">Mau belajar apa nih?</h1>
                <div className="row grid-container">
                    {mapel.map((subject, index) => (
                        <div className="grid-item" key={index} onClick={() => handleSelectSubject(subject)}>
                            <div className="card d-flex flex-row">
                                <img src="/assets/img/aljabar.png" alt="Image" className="card-img-left" />
                                <div className="card-body flex-grow-1 d-flex flex-column card-subject">
                                    <h5 className="card-title">{subject.title} ({subject.difficulty})</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

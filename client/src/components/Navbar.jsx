import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

export default function Navbar() {
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-info fixed-top">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand ps-3 text-white fw-bold">BersaMath</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header bg-info">
                            <h5 className="offcanvas-title text-white fw-bold" id="offcanvasNavbarLabel">BersaMath</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"/>
                        </div>
                        <div className="offcanvas-body bg-info">
                            <ul className="navbar-nav align-items-center flex-grow-1 pe-3 justify-content-center">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link" aria-current="page">Beranda</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/materi" className="nav-link">Materi</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/tugas" className="nav-link">Tugas</Link>
                                </li>
                            </ul>
                            <div className="justify-content-center d-flex pe-3">
                                <button className="btn" onClick={handleLoginClick}>Masuk</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Login show={showLogin} onClose={handleCloseLogin} />
        </>
    );
}
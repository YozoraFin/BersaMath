import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from './LoginPopup.jsx';

export default function Navbar({ onLogin, isLoggedIn }) {


    return (
        <div>
            <nav className="navbar navbar-expand-lg bg fixed-top py-3">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand ps-3 text-white" onClick={() => handleMenuClick('/')}>
                        Bersa<strong>Math</strong>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header bg">
                            <h5 className="offcanvas-title text-white fw-bold" id="offcanvasNavbarLabel">BersaMath</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"/>
                        </div>
                        <div className="offcanvas-body bg">
                            <ul className="navbar-nav align-items-center flex-grow-1 pe-3 justify-content-center gap-3">
                                <li className="nav-item">
                                    <Link 
                                        to="/" 
                                        className={`nav-link px-3`} 
                                        aria-current="page" 
                                        onClick={() => handleMenuClick('/')}
                                    >
                                        Beranda
                                    </Link>
                                </li>
                                {isLoggedIn && (
                                    <>
                                        <li className="nav-item">
                                            <Link 
                                                to="/materi" 
                                                className={`nav-link px-3`} 
                                                onClick={() => handleMenuClick('/materi')}
                                            >
                                                Materi
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link 
                                                to="/tugas" 
                                                className={`nav-link px-3`} 
                                                onClick={() => handleMenuClick('/tugas')}
                                            >
                                                Tugas
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                            <div className="justify-content-center d-flex pe-3">
                                <button className="btn btn-nav" onClick={handleLoginClick}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Login show={showLogin} onClose={handleCloseLogin} onLogin={onLogin} />
        </div>
    );
}

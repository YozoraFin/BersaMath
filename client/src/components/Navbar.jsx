import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';

export default function Navbar() {
    const [showLogin, setShowLogin] = useState(false);
    const [activeMenu, setActiveMenu] = useState('/');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const handleTitleClick = () => {
        setActiveMenu('/');
    };

    const handleMateriClick = () => {
        if (!isLoggedIn) {
            setShowLogin(true);
        } else {
            navigate('/materi');
        }
    };

    const handleTugasClick = () => {
        if (!isLoggedIn) {
            setShowLogin(true);
        } else {
            navigate('/tugas');
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg fixed-top py-3">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand ps-3 text-white" onClick={handleTitleClick}>
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
                                        className={`nav-link ${activeMenu === '/' ? 'active' : ''} px-3`} 
                                        aria-current="page" 
                                        onClick={() => handleMenuClick('/')}
                                    >
                                        Beranda
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link 
                                        to="#"
                                        className={`nav-link ${activeMenu === '/materi' ? 'active' : ''} px-3`} 
                                        onClick={() => {
                                            handleMenuClick('/materi');
                                            handleMateriClick();
                                        }}
                                    >
                                        Materi
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link 
                                        to="#"
                                        className={`nav-link ${activeMenu === '/tugas' ? 'active' : ''} px-3`} 
                                        onClick={() => {
                                            handleMenuClick('/tugas');
                                            handleTugasClick();
                                        }}
                                    >
                                        Tugas
                                    </Link>
                                </li>
                            </ul>
                            <div className="justify-content-center d-flex pe-3">
                                <button className="btn btn-nav" onClick={handleLoginClick}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Login show={showLogin} onClose={handleCloseLogin} />
        </div>
    );
}
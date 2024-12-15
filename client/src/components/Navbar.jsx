import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from './LoginPopup.jsx';

export default function Navbar({ onLogin, isLoggedIn, selectedSubject }) {
    const [showLogin, setShowLogin] = useState(false);
    const [activeMenu, setActiveMenu] = useState('/');
    const navigate = useNavigate();

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        if (isLoggedIn && selectedSubject) {
            const subjectPath = `${selectedSubject.title.toLowerCase()}/${selectedSubject.difficulty.toLowerCase()}`;
            console.log(`Navigating to ${menu}`);
            if (menu === '/beranda') {
                navigate(`/beranda/${subjectPath}`);
            } else if (menu === '/materi') {
                navigate(`/materi/${subjectPath}`);
            } else {
                navigate(menu);
            }
        } else if (isLoggedIn && !selectedSubject) {
            console.log("Redirecting to select subject");
            navigate("/select-subject");
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg fixed-top py-3">
                <div className="container-fluid">
                    <div className="navbar-brand ps-3 text-white navbar-title" onClick={() => handleMenuClick('/beranda')}>
                        Bersa<strong>Math</strong>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header bg">
                            <h5 className="offcanvas-title text-white fw-bold" id="offcanvasNavbarLabel">BersaMath</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                        </div>
                        <div className="offcanvas-body bg">
                            <ul className="navbar-nav align-items-center flex-grow-1 pe-3 justify-content-center gap-3">
                                <li className="nav-item">
                                    <div
                                        className={`nav-link ${activeMenu === '/beranda' ? 'active' : ''} px-3`}
                                        aria-current="page"
                                        onClick={() => handleMenuClick('/beranda')}
                                    >
                                        Beranda
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div
                                        className={`nav-link ${(!isLoggedIn || !selectedSubject) ? 'disabled' : ''} ${activeMenu === '/materi' ? 'active' : ''} px-3`}
                                        onClick={() => handleMenuClick('/materi')}
                                    >
                                        Materi
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div
                                        className={`nav-link ${(!isLoggedIn || !selectedSubject) ? 'disabled' : ''} ${activeMenu === '/tugas' ? 'active' : ''} px-3`}
                                        onClick={() => handleMenuClick('/tugas')}
                                    >
                                        Tugas
                                    </div>
                                </li>
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

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Beranda from './components/Beranda.jsx';
import BerandaGuest from './components/BerandaGuest.jsx';
import Materi from './components/Materi.jsx';
import Tugas from './components/Tugas.jsx';
import TugasDetail from './components/Tugas-detail.jsx';
import Footer from './components/Footer.jsx';
import Subjek from './components/Materi-detail.jsx';
import LoginPopup from './components/LoginPopup.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import SubjectSelection from './components/Mapel.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import DiskusiDetail from './components/Diskusi-detail.jsx';
import DiskusiAdd from './components/Diskusi-add.jsx';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [user, setUser] = useState({
        username: '',
        bio: '',
        profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBdTFjHTSEiiT-C59g1Q6VZyxukFwcy-NRrA&s'
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedSelectedSubject = JSON.parse(localStorage.getItem('selectedSubject'));
        if (storedUser) {
            setIsLoggedIn(true);
            setUser(storedUser);
        }
        if (storedSelectedSubject) {
            setSelectedSubject(storedSelectedSubject);
        }
    }, []);

    const handleLogin = (username) => {
        setIsLoggedIn(!!username);
        const updatedUser = { ...user, username };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setShowLoginPopup(false);
    };

    const handleShowLoginPopup = () => {
        setShowLoginPopup(true);
    };

    const handleCloseLoginPopup = () => {
        setShowLoginPopup(false);
    };

    const handleSelectSubject = (subject) => {
        setSelectedSubject(subject);
        localStorage.setItem('selectedSubject', JSON.stringify(subject));
    };

    const handleUpdateProfile = (updatedUser) => {
        setUser(prevUser => ({ ...prevUser, ...updatedUser }));
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    return (
        <div id='root'>
            <Navbar 
                onLogin={handleLogin}
                isLoggedIn={isLoggedIn}
                selectedSubject={selectedSubject}
                user={user} 
            />
            <main>
                <Routes>
                    <Route path='/' element={isLoggedIn ? (selectedSubject ? <Navigate to={`/beranda/${selectedSubject.title.toLowerCase()}`} /> : <Navigate to="/select-subject" />) : <BerandaGuest onShowLoginPopup={handleShowLoginPopup} />} />
                    <Route path="/select-subject" element={isLoggedIn ? <SubjectSelection onSelectSubject={handleSelectSubject} /> : <Navigate to="/" />} />
                    <Route path="/beranda/:subject" element={isLoggedIn ? <Beranda user={user} /> : <Navigate to="/" />} />
                    <Route path="/materi/:subject" element={isLoggedIn ? <Materi /> : <Navigate to="/" />} />
                    <Route path="/materi/:subject/:id" element={isLoggedIn ? <Subjek /> : <Navigate to="/" />} />
                    <Route path="/materi/:subject/:id/discussion/:discussionId" element={isLoggedIn ? <DiskusiDetail user={user} /> : <Navigate to="/" />} />
                    <Route path="/materi/:subject/:id/discussion-add" element={isLoggedIn ? <DiskusiAdd user={user} /> : <Navigate to="/" />} />
                    <Route path="/tugas" element={<PrivateRoute isLoggedIn={isLoggedIn && selectedSubject} element={<Tugas selectedSubject={selectedSubject ? selectedSubject.title : ''} />} />} />
                    <Route path="/tugas/:id" element={<PrivateRoute isLoggedIn={isLoggedIn && selectedSubject} element={<TugasDetail selectedSubject={selectedSubject ? selectedSubject.title : ''} />} />} />
                    <Route path="/profile" element={isLoggedIn ? <ProfilePage user={user} onUpdateProfile={handleUpdateProfile} /> : <Navigate to="/" />} />
                </Routes>
            </main>
            <Footer />
            {showLoginPopup && (
                <LoginPopup 
                    show={showLoginPopup} 
                    onClose={handleCloseLoginPopup} 
                    onLogin={handleLogin}
                />
            )}
        </div>
    );
}

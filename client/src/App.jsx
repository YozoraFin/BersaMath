import { useState } from 'react';
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

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [user, setUser] = useState({
        username: '',
        bio: '',
        profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBdTFjHTSEiiT-C59g1Q6VZyxukFwcy-NRrA&s'
    });

    const handleLogin = (username) => {
        setIsLoggedIn(true);
        setUser(prevUser => ({ ...prevUser, username }));
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
    };

    const handleUpdateProfile = (updatedUser) => {
        setUser(prevUser => ({ ...prevUser, ...updatedUser }));
    };

    return (
        <div id='root'>
            <Navbar 
                onLoginClick={handleShowLoginPopup}
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

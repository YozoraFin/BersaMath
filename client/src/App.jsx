import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Beranda from './components/Beranda.jsx';
import BerandaGuest from './components/BerandaGuest.jsx';
import Materi from './components/Materi.jsx';
import Tugas from './components/Tugas.jsx';
import Footer from './components/Footer.jsx';
import Subjek from './components/Materi-detail.jsx';
import LoginPopup from './components/LoginPopup.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import SubjectSelection from './components/Mapel.jsx';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
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

  return (
    <div id='root'>
      <Navbar 
        onLoginClick={handleShowLoginPopup} 
        onLogin={handleLogin} 
        isLoggedIn={isLoggedIn} 
        selectedSubject={selectedSubject} 
      />
      <main>
        <Routes>
          <Route path='/' element={isLoggedIn ? (selectedSubject ? <Navigate to={`/beranda/${selectedSubject.title.toLowerCase()}/${selectedSubject.difficulty.toLowerCase()}`} /> : <Navigate to="/select-subject" />) : <BerandaGuest onShowLoginPopup={handleShowLoginPopup} />} />
          <Route path="/select-subject" element={isLoggedIn ? <SubjectSelection onSelectSubject={handleSelectSubject} /> : <Navigate to="/" />} />
          <Route path="/beranda/:subject/:difficulty" element={isLoggedIn ? <Beranda username={username} /> : <Navigate to="/" />} />
          <Route path="/materi/:subject/:difficulty" element={isLoggedIn ? <Materi /> : <Navigate to="/" />} />
          <Route path="/materi/:subject/:difficulty/:id" element={isLoggedIn ? <Subjek /> : <Navigate to="/" />} />
          <Route path="/tugas" element={<PrivateRoute isLoggedIn={isLoggedIn && selectedSubject} element={<Tugas />} />} />
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

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleLogin = () => {
    console.log("handleLogin called"); // Debug log
    setIsLoggedIn(true);
    setShowLoginPopup(false);
  };

  const handleShowLoginPopup = () => {
    setShowLoginPopup(true);
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <div id='root'>
      <Navbar onLoginClick={handleShowLoginPopup} onLogin={handleLogin} />
      <main>
        <Routes>
          <Route path='/' element={isLoggedIn ? <Navigate to="/beranda" /> : <BerandaGuest onShowLoginPopup={handleShowLoginPopup} />} />
          <Route path="/beranda" element={isLoggedIn ? <Beranda /> : <Navigate to="/" />} />
          <Route path="/materi" element={<Materi />} />
          <Route path="/materi/:id" element={<Subjek />} />
          <Route path="/tugas" element={<Tugas />} />
        </Routes>
      </main>
      <Footer />
      {showLoginPopup && (
        <LoginPopup 
          show={showLoginPopup} 
          onClose={handleCloseLoginPopup} 
          onLogin={handleLogin} // Passing handleLogin
        />
      )}
    </div>
  );
}

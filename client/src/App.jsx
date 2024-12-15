import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
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
    console.log("handleLogin called");
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
      <Navbar onLoginClick={handleShowLoginPopup} onLogin={handleLogin} isLoggedIn={isLoggedIn} />
      <main>
        <Routes>
          <Route path='/' element={isLoggedIn ? <Navigate to="/beranda" /> : <BerandaGuest onShowLoginPopup={handleShowLoginPopup} />} />
          <Route path="/beranda" element={isLoggedIn ? <Beranda /> : <Navigate to="/" />} />
          <Route path="/materi" element={isLoggedIn ? <Materi /> : <Navigate to="/" />} />
          <Route path="/materi/:id" element={isLoggedIn ? <Subjek /> : <Navigate to="/" />} />
          <Route path="/tugas" element={isLoggedIn ? <Tugas /> : <Navigate to="/" />} />
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

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Beranda from './components/Beranda.jsx';
import Materi from './components/Materi.jsx';
import Tugas from './components/Tugas.jsx';
import Footer from './components/Footer.jsx';
import Subjek from './components/Materi-detail.jsx';
import Pelajaran from './components/Pelajaran.jsx';

export default function App() {
  return (
    <div id='root'>
      <Navbar/>
      <main>
        <Routes>
          <Route path="/pelajaran" element={<Pelajaran />} />
          <Route exact path='/' element={<Beranda />} />
          <Route path="/materi" element={<Materi />} />
          <Route path="/materi/:id" element={<Subjek />} />
          <Route path="/tugas" element={<Tugas />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}
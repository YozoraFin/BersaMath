import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Beranda from './components/Beranda.jsx';
import Materi from './components/Materi.jsx';
import Tugas from './components/Tugas.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div id='root'>
      <Navbar/>
      <main>
        <Routes>
          <Route exact path='/' element={<Beranda />} />
          <Route path="/materi" element={<Materi />} />
          <Route path="/tugas" element={<Tugas />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}
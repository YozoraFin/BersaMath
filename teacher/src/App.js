import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Class from './pages/Class';
import Lesson from './pages/Lesson';
import Practice from './pages/Practice';
import Profile from './pages/Profile';
import Student from './pages/Student';
import Submission from './pages/Submission';
import LessonDetail from './pages/LessonDetail';
import LessonCreate from './pages/LessonCreate';
import PracticeCreate from './pages/PracticeCreate';
import PracticeDetail from './pages/PracticeDetail';
import Discussion from './pages/Discussion';
import 'izitoast/dist/css/iziToast.min.css'
import { useEffect } from 'react';


function App() {
  useEffect(() => {
    
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/bersamath' element={<Layout/>}>
        <Route index element={<Dashboard/>} />
        <Route path='kelas' element={<Class/>} />
        <Route path='materi' element={<Lesson/>} />
        <Route path='materi/create' element={<LessonCreate/>} />
        <Route path='materi/:id' element={<LessonDetail/>} />
        <Route path='tugas' element={<Practice/>} />
        <Route path='tugas/create' element={<PracticeCreate/>} />
        <Route path='tugas/:id' element={<PracticeDetail/>} />
        <Route path='profil' element={<Profile/>} />
        <Route path='xplorer/:id' element={<Student/>} />
        <Route path='xplorer/:id/:idtugas' element={<Submission/>} />
        <Route path='diskusi/:id' element={<Discussion/>}/>
      </Route>
    </Routes>
  );
}

export default App;

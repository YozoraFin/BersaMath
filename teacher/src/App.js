import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Class from './pages/Class';
import Lesson from './pages/Lesson';
import Assignment from './pages/Assignment';
import Profile from './pages/Profile';
import Student from './pages/Student';
import Answer from './pages/Answer';
import LessonDetail from './pages/LessonDetail';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/bersamath' element={<Layout/>}>
        <Route index element={<Dashboard/>} />
        <Route path='kelas' element={<Class/>} />
        <Route path='materi' element={<Lesson/>} />
        <Route path='materi/:id' element={<LessonDetail/>} />
        <Route path='tugas' element={<Assignment/>} />
        <Route path='profil' element={<Profile/>} />
        <Route path='xplorer/:id' element={<Student/>} />
        <Route path='xplorer/:id/:idtugas' element={<Answer/>} />
      </Route>
    </Routes>
  );
}

export default App;

import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Class from './pages/Class';
import Course from './pages/Course';
import Assignment from './pages/Assignment';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/bersamath' element={<Layout/>}>
        <Route index element={<Dashboard/>} />
        <Route path='kelas' element={<Class/>} />
        <Route path='materi' element={<Course/>} />
        <Route path='tugas' element={<Assignment/>} />
        <Route path='profil' element={<Profile/>} />
      </Route>
    </Routes>
  );
}

export default App;

import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Siteconfig from './pages/Siteconfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function App() {
  return (
    <Routes>
      <Route path='/aaa' element={<Login/>}/>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Dashboard/>} />
        <Route path='siteconfig' element={<Siteconfig/>} />
      </Route>
    </Routes>
  );
}

export default App;

import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Siteconfig from './pages/Siteconfig';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/admin' element={<Layout/>}>
        <Route index element={<Dashboard/>} />
        <Route path='siteconfig' element={<Siteconfig/>} />
      </Route>
    </Routes>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Project from './pages/Project';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/project' element={<Project/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
      </Routes>
    </>
  );
}

export default App;

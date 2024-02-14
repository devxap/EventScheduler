import React from 'react';
import '../src/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

const App=()=> {
  return <BrowserRouter>
  <Routes>
  <Route path="/login" element={<Login/>}></Route>
  <Route path="/register" element={<Register/>}></Route>
  <Route path="/" element={<Homepage/>}></Route>
  </Routes>
  </BrowserRouter>
  
}

export default App;

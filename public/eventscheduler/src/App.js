import React from 'react';
import '../src/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import Login from './pages/LoginStudent.jsx';
import Register from './pages/RegisterStudent.jsx';

const App = () => {
  const user = localStorage.getItem('chat-app-user');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loginStudent" element={<Login />} />
        <Route path="/registerStudent" element={<Register />} />
        <Route path="/homepage" element={<Homepage/>} />
        <Route
          path="/"
          element={user ? <Navigate to="/homepage" replace /> : <Navigate to="/loginStudent" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

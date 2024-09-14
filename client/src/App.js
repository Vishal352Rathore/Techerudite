// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerRegistration from './pages/CustomerRegistration';
import AdminRegistration from './pages/AdminRegistration';
import AdminLogin from './pages/AdminLogin';

const App = () => {
    return (
        <Router>
                <Routes>
                
                    <Route index element={<AdminRegistration/>} />
                    <Route path="/register/customer" element={<CustomerRegistration/>} />
                    <Route path="/register/admin" element={<AdminRegistration/>} />
                    <Route path="/login" element={<AdminLogin/>} />
                 
                </Routes>
        </Router>
    );
};

export default App;

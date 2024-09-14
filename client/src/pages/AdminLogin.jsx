// src/pages/AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const AdminLogin = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://192.168.31.157:5000/login', form);
            localStorage.setItem('token', response.data.token);

            console.log("response" ,response.data);

            if(response.data.subcode === false){
                alert(response.data.message);
            }else {
                alert('Login successful');
            }
            
        } catch (error) {
            alert(error || 'Login failed.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Login as Admin
                    </button>
                    <div className=' flex justify-between'>
                        <Link to='/register/customer' className="text-blue-500 hover:text-blue-700 underline">Register as customer</Link>
                        <Link to='/register/admin' className="text-blue-500 hover:text-blue-700 underline">Register as admin</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;

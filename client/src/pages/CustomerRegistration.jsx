// src/pages/CustomerRegistration.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CustomerRegistration = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://192.168.31.157:5000/register/customer', form);
            alert('Registration successfull');
            setForm({
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            });
            navigate("/login");
        } catch (error) {
            alert('Registration failed.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Customer Registration</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
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
                        Register as Customer
                    </button>
                    <div className=' flex justify-between'>
                        <Link to='/register/admin' className="text-blue-500 hover:text-blue-700 underline">Register as admin</Link>
                        <Link to='/login' className="text-blue-500 hover:text-blue-700 underline">Login</Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CustomerRegistration;

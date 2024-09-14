import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VerifyEmail = () => {
    const { token } = useParams();

    useEffect(() => {
        const verify = async () => {
            try {
                await axios.get(`http://192.168.31.157:5000/verify-email/${token}`);
                alert('Email verified successfully');
            } catch (error) {
                alert('Error verifying email');
            }
        };

        verify();
    }, [token]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Verifying Email</h2>
                <p>Please wait while we verify your email...</p>
            </div>
        </div>
    );
};

export default VerifyEmail;

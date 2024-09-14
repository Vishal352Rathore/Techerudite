const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'harishsangre00@gmail.com',
        pass: 'gpls fbqj bdvz gaag'
    }
});

exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const { role } = req.params;

    if (!['customer', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            verificationToken
        });

        await user.save();

        res.status(200).json({ message: 'Registration successful. Please verify your email.' });

        const verificationLink = `http://192.168.31.157:5000/verify-email/${verificationToken}`;
        const mailResponse = await transporter.sendMail({
            to: email,
            subject: 'Email Verification',
            text: `Please verify your email by clicking on the following link: ${verificationLink}`
        });
        console.log("mailResponse" ,mailResponse);
        
    } catch (error) {
        console.error('Error during registration:', error); // Log detailed error
        res.status(500).json({ message: 'Error registering user' });
    }
};

exports.verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ verificationToken: token });
        if (!user) return res.status(400).json({ message: 'Invalid token' });

        user.verified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying email' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

  
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(200).json({ subcode : false , message: 'User not found' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(200).json({ subcode : false , message: 'Invalid password' });
        if (!user.verified) return res.status(200).json({  subcode : false , message: 'Email not verified' });
        if (user.role === 'customer') return res.status(200).json({ subcode : false , message: 'You are not allowed to login from here' });

        const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret');
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
};

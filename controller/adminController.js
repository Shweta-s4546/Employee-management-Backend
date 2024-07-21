const User = require("../model/adminModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register
const register =  async (req,res) =>{
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

// //login
const login = async (req,res) =>{

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        res.status(200).json({ message: 'Login successful'});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//loggedout
const logedOut = async (req,res) =>{
    try {
        res.status(201).json({ message: 'logout successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {register,login,logedOut}
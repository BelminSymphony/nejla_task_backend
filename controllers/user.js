const express = require("express")
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router()




router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordValid = await user.comparePassword(password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id }, 'randomsecretkeythatisnotverysecret', { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', data: {user: user, token: token} });
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  })

router.post("/register",async (req, res) => {
    try {
      const { firstName, lastName , email, password } = req.body;
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
  
      const newUser = new User({ firstName, lastName, email, password });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  })

module.exports = router
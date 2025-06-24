const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

router.post('/register', async (req, res) => {
  console.log("Register endpoint hit");
  console.log("Request body:", req.body);
  const { name, matriculationNumber, password, confirmPassword  } = req.body;
  if (!name || !matriculationNumber || !password || !confirmPassword){
    return res.status(400).json({ message: 'All fields are required.'})
  }
  const existingUser = await User.findOne({ matriculationNumber });
  if (existingUser) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    console.log('Salt:', salt);
    console.log('Plain password:', password);

    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed password:', hashedPassword);

    const newUser = new User({
      name,
      matriculationNumber,
      password: hashedPassword,
      confirmPassword: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ msg: 'User registered successfully' });
    navigation.navigate('Login');
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { matriculationNumber, password } = req.body;

  if (!matriculationNumber || !password) {
      return res.status(400).json({ message: "Matriculation number and password are required" });
  }

  try {
      const user = await User.findOne({ matriculationNumber }).lean();

      if (!user) {
          return res.status(400).json({ message: "Student not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id }, 'myHSESecretJWTKey123!', {
          expiresIn: '1h',
      });

      res.status(200).json({
          message: "Login successful",
          token,
          user: {
              id: user._id,
              name: user.name,
              matriculationNumber: user.matriculationNumber
          }
      });
  } catch (error) {
      console.error('Login failed with error:', error);
      res.status(500).json({ message: "Login failed", error });
  }
});

router.get('/dashboard', authenticate, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password');

      const safeUserData = {
          id: user._id,
          name: user.name,
          matriculationNumber: user.matriculationNumber,
      };

      res.json(safeUserData);
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Failed to load dashboard", error });
  }
});


router.post('/update-password', authenticate, async (req, res) => {
  const { newPassword } = req.body;
  try {
      const student = await Student.findById(req.user.id);

      student.password = await bcrypt.hash(newPassword, 10);
      await student.save();

      res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
      res.status(500).json({ message: "Failed to update password", error });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});


module.exports = router;
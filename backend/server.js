const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const User = require('./models/User')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err))

// Routes
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' })
    }

    const newUser = new User({ name, email, password })
    await newUser.save()

    res.status(201).json({ message: 'User registered successfully!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// ========== SIGNIN ROUTE ==========
app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login request body:', req.body);

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    res.status(200).json({ message: 'Login successful!' });

  } catch (error) {
    console.error('SignIn Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ========== GET USER BY EMAIL ==========
app.get('/api/user/:email', async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const user = await User.findOne({ email }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

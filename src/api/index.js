const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const jwtSecret='ajgsdvhbas';
const app = express();
require('dotenv').config()
mongoose.set('strictQuery', false)

// // Connect to MongoDB database
// mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true })
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error(error));

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', userSchema);

// Express middleware
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000',
}));

//test
app.get('/',(req, res) => {
res.json("test ok")})


// Registration route
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    //tokens and cookies work 
 jwt.sign({email:user.email , id:user._id },jwtSecret,{},(err,token)=>{
   if(err) throw err;
   res.cookie('token', token).status(200).json({ message: 'Login successful' });
 })
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

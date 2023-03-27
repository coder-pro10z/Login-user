const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const jwtSecret=('ajgsdvhbas');
const cookieParser= require('cookie-parser');
const imageDownloader=require('image-downloader')
const Place=require('./models/Place')
const Booking= require('./models/Booking')
const multer = require('multer')
const fs=require('fs');
const app = express();
require('dotenv').config()
mongoose.set('strictQuery', false)

// // Connect to MongoDB database
// mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true })
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error(error));

//function to get the userData from token
  function getUserDataFromReq(req){
    return new Promise((resolve,reject)=>{
      jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData)=>{
        if(err) throw err;
        resolve(userData);
      })
    }) 
  }

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', userSchema);

// Express middleware
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'))
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
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(404).json({ message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, userDoc.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    //tokens and cookies work 
 jwt.sign({email:userDoc.email , id:userDoc._id },jwtSecret,{},(err,token)=>{
   if(err) throw err;
   res.cookie('token', token).status(200).json(userDoc);
 })
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  } 
});
//profile  name displaying 

app.get('/profile', (req,res)=>{
  const {token}=req.cookies;
  
if (token) {
jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
  if(err) throw err;
  const {name,email,_id}=
   await User.findById(userData.id);
  // const userDoc
  res.json({name,email,_id});
})
  }
  else{
    res.json(null);
  }
})


app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true)
})


app.post('/upload-by-link', async (req,res)=>{
  
  const {link}=req.body;
  const newName='Photo' + Date.now() + '.jpg';


    await imageDownloader.image({
      url:link,
      dest: __dirname+'/uploads/' +newName,
    });

    
    res.json(newName);
})

const photosMiddleware=multer({dest:'uploads'});
app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
  const uploadedFiles=[]
  for(let i=0;i< req.files.length ;i++){
    const {path,originalname}=req.files[i];
    const parts=originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath=path+"."+ ext
    fs.renameSync(path,newPath)
    uploadedFiles.push(newPath.replace('uploads',''))  
  }
res.json(uploadedFiles);
})
//request and respones function for places

app.post('/places', (req,res)=>{
  const {token}=req.cookies;
  const {title,address,addedPhotos,
description,perks,extraInfo,
checkIn,checkOut,maxGuests,price,}=req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
    if(err) throw err;
    const placeDoc=await Place.create({
owner:userData.id,title,address,
photos:addedPhotos,description,perks,
extraInfo,checkIn,checkOut,maxGuests,price
    });
    res.json(placeDoc);
  });
});

app.get('/user-places',(req,res)=>{
  // if(err) throw err;
  const {token}=req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
    const {id} = userData;
   // console.log(Place.find({owner:id}))
     res.json(await Place.find({owner:id}));
  });

});

app.get('/places/:id',async (req,res) =>{
  /* res.json(req.params) */
  const {id} = req.params;
  res.json(await Place.findById(id))

})


app.put('/places/',async (req,res)=>{
  // const {id} = req.params;
  const {token} = req.cookies;
  const {id, title,address,addedPhotos,
    description,perks,extraInfo,
    checkIn,checkOut,maxGuests,price,}=req.body;
    
  jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
    if(err) throw err;
    const placeDoc= await Place.findById(id);
    if( userData.id === placeDoc.owner.toString()){
      placeDoc.set({
        title,address,
      photos:addedPhotos,description,perks,
      extraInfo,checkIn,checkOut,maxGuests,price,
      })
      await placeDoc.save();
      //This line was responsible for crashing nodemon because there were 2 simultaneous call back were made with the help of response (res).
       return res.json('ok') 
    };
   // res.json(await Place.find({owner:id}));
  });
  }
)

app.get('/places', async(req,res)=>{
  res.json(await Place.find());
});

app.post('/bookings',async (req,res)=>{
  const userData=await getUserDataFromReq(req)

  const {
    place,checkIn,checkOut,numberOfGuests,name,phone,price,
  } = req.body;
  Booking.create({
    place,checkIn,checkOut,numberOfGuests,name,phone,price,user:userData.id,
  }).then((doc) => {
    res.json(doc);
  }).catch((err)=>{
    throw err;
  });
});

app.get('/bookings',async (req,res)=>{
  /* const {token} = req.cookies; */
  const userData=await getUserDataFromReq(req)

  res.json(await Booking.find({user:userData.id}).populate('place'));
})


//Attempt to Delete Place Enteries 
// Delete entry by ID
// Delete place route
// Delete a place with the specified ID
app.delete('/user-places/:id', (req, res) => {
  const id = req.params.id;
  Place.findByIdAndRemove(id, (err, place) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while deleting the place' });
    } else {
      res.json({ message: 'Place deleted successfully' });
    }
  });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

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
const { Router } = require('express');
const app = express();
require('dotenv').config()
//added stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


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
  password: String,
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'},
  phone :{ type: Number, unique: true },
  uid:{ type: Number, unique: true }
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

// app.post('/places', (req,res)=>{
//   const {token}=req.cookies;
//   const {title,address,addedPhotos,
// description,perks,extraInfo,
// checkIn,checkOut,maxGuests,price,}=req.body;
//   jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
//     if(err) throw err;
//     const placeDoc=await Place.create({
// owner:userData.id,title,address,
// photos:addedPhotos,description,perks,
// extraInfo,checkIn,checkOut,maxGuests,price
//     });
//     res.json(placeDoc);
//   });
// });

//Update the 'Places' route
app.post('/places', async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  try {
    const userData = await getUserDataFromReq(req);
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: placeDoc.title,
            },
            unit_amount: placeDoc.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating place' });
  }
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
app.delete('/places/:id', (req, res) => {
  const id = req.params.id;
  Place.findByIdAndRemove(id, (err, Place) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while deleting the place' });
    } else {
      res.json({ message: 'Place deleted successfully' });
    }
  });
});
// user profile photo

//SEARCH

// GET all places or search by address
app.get('/places', async (req, res) => {
  try {
    const { search } = req.query;
    const query = search ? { address: { $regex: search, $options: 'i' } } : {};
    const places = await Place.find(query);
    res.json(places);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


//Create a new route to create a Stripe checkout session. In this route, you can create a new Checkout session object using the stripe.checkout.sessions.create() method.
// app.post('/create-checkout-session', async (req, res) => {
//   const { amount, currency } = req.body;
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency:'INR',
//             product_data: {
//               name: 'Product Name',
//             },
//             unit_amount: amount,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: 'http://localhost:3000/success',
//       cancel_url: 'http://localhost:3000/cancel',
//     });
//     res.json({ id: session.id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error creating checkout session' });
//   }
// });

app.post('/create-checkout-session', async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'INR',
            product_data: {
              name: 'Product Name',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating checkout session' });
  }
});


//success
app.get('/success', async (req, res) => {
  const { session_id } = req.query;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    await stripe.charges.create({
      amount: session.amount_total,
      currency: session.currency,
      source: session.payment_intent,
    });
    res.json({ message: 'Payment successful' });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Payment failed' });
  }
});

app.get('/cancel', (req, res) => {
  res.json({ message: 'Payment cancelled' });
});


//payment
// app.post('/api/payment', async (req, res) => {
//   const { token, booking } = req.body;

//   try {
//     const charge = await stripe.charges.create({
//       amount: booking.price * 100,
//       currency: 'INR',
//       source: token.id,
//       description: `Booking Payment for ${booking.place.title}`,
//     });
//     console.log(charge);
//     // Handle success
//     res.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     // Handle error
//     res.json({ success: false, error: error.message });
//   }
// });
app.post('/api/payment', async (req, res) => {
  try {
    const { token, booking,unit_amount } = req.body;

    // Set your Stripe secret key
    const stripe = require('stripe')('sk_test_your_secret_key');

    // Create a charge
    const charge = await stripe.charges.create({
      amount: unit_amount, // Stripe requires the amount in cents
      currency: 'INR',
      source: token.id,
      description: 'Booking Payment',
      metadata: {
        booking_id: booking.id,
      },
    });

    // Handle success
    console.log('Charge created:', charge.id);
    res.status(200).send({ success: true, chargeId: charge.id });
  } catch (error) {
    // Handle error
    console.error('Error creating charge:', error.message);
    res.status(500).send({ success: false, error: error.message });
  }
});


//payment-process
app.post('/api/process-payment', async (req, res) => {
  const { token, booking } = req.body;

  try {
    // Use Stripe API to charge the user's card
    const charge = await stripe.charges.create({
      amount: booking.price * 100, // in cents
      currency: "INR",
      source: token.id,
      description: "Booking Payment"
    });

    // Save the booking to the database
    const newBooking = new Booking({
      place: booking.place._id,
      title:booking.place.title,
      user: booking.user._id,
      name: booking.user.name,
      price: booking.price,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut
    });
    await newBooking.save();

    // Return success response to the client
    res.status(200).json({ message: 'Payment successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing payment' });
  }
});




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

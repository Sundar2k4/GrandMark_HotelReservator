const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.js');
const jwt = require('jsonwebtoken'); // Use 'jwt' instead of 'jst'
const cookieParser = require('cookie-parser');
const imagedownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs')//filesystem
const path = require('path');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');

const bcryptSalt = bcrypt.genSaltSync(10); // Generates the secret hash key for encrypting password
const jwtSecret = 'bdewy321823623bshwe81230nqj'; // Updated to 'jwtSecret' for clarity
app.use(express.json()); // Adds JSON parser to avoid internal server error
app.use(cookieParser()); // Parses cookies to avoid server error when accessing cookie data
app.use('/uploads',express.static(__dirname+'/uploads')) // to specify the whole path

const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req)
{
    return new Promise((resolve,reject)=>
    {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
        if(err) throw err;
        resolve(userData)
    });
   });
}


app.get('/test', (req, res) => {
    res.json('hello daw');
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt), // Encrypts the password
        });

        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e); // 422 - Unprocessable Entity
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });

    if (userDoc) {
        const passOK = bcrypt.compareSync(password, userDoc.password); // Compare password if email matches
        if (passOK) {
            jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('password incorrect');
        }
    } else {
        res.json('not found');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name,email,_id} = await User.findById(userData.id); // Ensure using 'id' instead of '_id'
            res.json({name,email,_id}); // Return user data if token is valid
        });
    } else {
        res.json(null); // No token, return null
    }
});


app.post('/logout',(req,res) =>
{
          res.cookie('token','').json(true);//it sends a token for a dummy value after receiving which the function redirects to homepage
});




app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;

    // Check if the link is a Data URL
    if (link.startsWith('data:image/jpeg;base64,' )) {
        // Handle the Data URL case
        const base64Data = link.replace(/^data:image\/jpeg;base64,/, "");
        const newName = 'Photo' + Date.now() + '.jpg';
        const filePath = path.join(__dirname, 'uploads', newName);

        fs.writeFile(filePath, base64Data, 'base64', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to save image' });
            }
            return res.json(newName);
        });
    } else {
        // Handle normal URL case
        try {
            const newName = 'Photo' + Date.now() + '.jpg';
            const filePath = path.join(__dirname, 'uploads', newName);

            // Use the download function only for standard URLs
            await imagedownloader.image({
                url: link, // This should be a standard URL
                dest: filePath
            });
            res.json(newName);
        } catch (error) {
            res.status(500).json({ message: 'Error downloading image', error: error.message });
        }
    }
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer
const photosMiddleware = multer({ dest: 'uploads/' });

// Upload endpoint
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
     const {path,originalname} = req.files[i];
     const parts = originalname.split('.');
     const ext   = parts[parts.length-1];
     const newPath = path + '.' + ext;
     fs.renameSync(path,newPath);
     uploadedFiles.push(newPath.replace(/uploads[\\/]/, ''));

    }
    res.json(uploadedFiles); // Respond with the array of file URLs
});

app.post('/places',(req,res)=>
{
    const { token } = req.cookies;
    const {title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        try{
              const {PlaceDoc} = await Place.create({
              owner:userData.id,
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

        res.json(PlaceDoc);
    }catch(e){res.json(e)};
    });
   
});


app.get('/user-places',async (req,res)=>
{
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData; //obtaining the unique user data from a particular user with the id 
        res.json( await Place.find({owner:id}));
    });

});

app.get('/places/:id',async (req,res)=>
{
   const {id} = req.params; //obtaining the user id from the clientside 
   res.json(await Place.findById(id) )

})

app.put('/places',async (req,res) => {
    const { token } = req.cookies;
    const {id,title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price} = req.body;
    const placeDoc = await Place.findById(id);
    jwt.verify(token, jwtSecret, {}, async (err, userData) => { //verifying the id to check if it is the user 
       if(err) throw err;
        if(userData.id===placeDoc.owner.toString())
       {
            placeDoc.set({
              owner:userData.id,
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
            await placeDoc.save();
            res.json('saved');
       }

    });
});

app.get('/places', async (req,res)=>{ // this endpoint is for the index page and since it includes all the
    res.json(await Place.find());//user places it doesnt require a specific id 
})


app.post('/bookings',async (req,res)=>
{
    const userData = await getUserDataFromReq(req);
    const{place,checkIn,checkOut,numberOfGuests,name,mobile,price} = req.body;
    await Booking.create({

        place,checkIn,checkOut,numberOfGuests,name,mobile,price,
        user:userData.id,
    }).then((doc)=>
    {
        res.json(doc);
    }).catch((err)=>{
        throw err;
    })
})



app.get('/bookings', async (req,res)=>
{
 const userData = await getUserDataFromReq(req);
 res.json( await Booking.find({user:userData.id}).populate('place')); //sends(populates) all the data within the id place
   
})

app.listen(4000,()=>
{
    console.log('listening on port 4000');
});
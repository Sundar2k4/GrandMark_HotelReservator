const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.js');
const jwt = require('jsonwebtoken'); // Use 'jwt' instead of 'jst'
const cookieParser = require('cookie-parser');
const download = require('image-downloader');

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


app.post('/upload-by-link',async (req,res) =>

   {
    const{link} = req.body;
    const newName ='Photo'+Date.now()+'.jpg';
    await download.image({
    url:link,
    dest:__dirname+'/uploads/'+ newName, //where the dirname is the whole doc structure 
   })

   res.json(newName);
  
});





app.listen(4000,()=>
{
    console.log('listening on port 4000');
});
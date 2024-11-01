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


const photosMiddleware = multer({dest:'uploads'});
app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>
{ const uploadedFiles = [];
  for(let i=0;i<req.files.length;i++)
  {
    const {path,originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length-1];
    const newPath = path+ '.' + ext;
    fs.renameSync(path,newPath);
    uploadedFiles.push(newPath.replace('uploads/',''));
  }
    res.json(uploadedFiles);
});



app.listen(4000,()=>
{
    console.log('listening on port 4000');
});
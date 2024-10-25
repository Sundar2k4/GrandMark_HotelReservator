const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.js')

const bcryptSalt = bcrypt.genSaltSync(10); //function to generate the secret hash key for encrypting password

app.use(express.json()) //to avoid the internal server error adding json parser
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


app.post('/register',async (req,res)=>
{
    try{
    const {name,email,password} = req.body;
    const userDoc =  await User.create({
        
          name,
          email,
          password:bcrypt.hashSync(password,bcryptSalt), //encrypting the password

         

    }); 

    res.json(userDoc)
}
    catch(e)
    {
        res.status(422).json(e); //422-unprocessable entity
    }
    
   
})

// cluster password: i19HsmZdvfigB2zj

app.post('/Login',async(req,res)=>
{
    //try{}
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});

    if(userDoc)
    {
        res.json('found');
    }
    else
    {
        res.json('Not Found')
    }
});


app.listen(4000);
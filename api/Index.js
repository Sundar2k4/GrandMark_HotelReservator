const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.js');
const jst = require('jsonwebtoken');

const bcryptSalt = bcrypt.genSaltSync(10); //function to generate the secret hash key for encrypting password
const jstsecret = 'bdewy321823623bshwe81230nqj';
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

    if(userDoc) //comparing with the email in the Db for user login
    {
        const passOK = bcrypt.compareSync(password,userDoc.password);//compare the password if the gmail is same.
        if(passOK)
        {
            jst.sign({email:userDoc.email,id:userDoc._id},jstsecret,{}, (err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json('password correct');
        });
        } 
        else
        {
            res.status(422).json('password incorrect');
        }
        
    }
    else
    {
        res.json('not found');
    }
   
});


app.listen(4000);
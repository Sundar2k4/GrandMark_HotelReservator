const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
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


app.post('/register',(req,res)=>
{
    const {name,email,password} = req.body; //obtaining the user details from the register page
    res.json({name,email,password});
})

// cluster password: i19HsmZdvfigB2zj

app.listen(4000);
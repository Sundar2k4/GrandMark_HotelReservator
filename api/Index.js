const express = require('express');
const app = express();
const cors = require('cors'); //to resolve the endpoint(port) errors due to difference

//mainly to remove the cross origin problems
app.use(cors(
    {
        credentials:true,
        origin:'http://127.0.0.1:5173',

    }
));

app.get('/test',(req,res) =>{
    res.json('hello daw');
});

app.listen(4000)
const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({ //creating the schema for the DB
   name : String,
   email : {type:String,unique:true},
   password : String,
}); 

const UserModel = mongoose.model('User',UserSchema); //to upload the schema as a model

module.exports = UserModel; // exporting the model
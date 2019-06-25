const mongoose =  require('mongoose');
var AddressBookSchema = mongoose.Schema({
   
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
  
    },
    tags:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    zipcode:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:false,
    },
    company:{
        type:String,
        required:false,
    },
    createdAt:{
        type:String,
        required:false
  
    },
    updatedAt:{
        type:String,
        required:false
  
    }
  });
var AddressBook =  mongoose.model('address_book',AddressBookSchema);
module.exports = {AddressBook};
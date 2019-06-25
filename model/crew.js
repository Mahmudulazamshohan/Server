const mongoose =  require('mongoose');

var CrewSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    dp_name:{
        type:String,
        required:true,
    },
    createdAt:{
        type:String,
        required:false
  
    },
    updatedAt:{
        type:String,
        required:false
  
    },
    users : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users' 
    }]
  });
var Crew =  mongoose.model('crew',CrewSchema);
module.exports = {Crew};
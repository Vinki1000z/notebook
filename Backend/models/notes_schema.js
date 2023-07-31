const mongoose = require('mongoose');
const notes_schema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    user:{
        type:mongoose.Schema.ObjectId,
        //  model name comes 
        // means not file name not not any thing else only model name 
        // name by which it is sotred in mongose
        ref:"users"

    }
  });
  const note = mongoose.model('Notes', notes_schema);
  module.exports=note;
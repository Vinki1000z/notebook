const mongoose = require("mongoose");
var validaitor=require("validator");

const users_schema = new mongoose.Schema({
    name: {
      type:String,
    },
    email:String,
    password:String
  });

  const user = mongoose.model('users', users_schema);
  module.exports=user;
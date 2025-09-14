const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const rightsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  tel: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  
  
});

rightsSchema.plugin(passportLocalMongoose,{
  usernameField:"email"
});
module.exports = mongoose.model('UserModel', rightsSchema);
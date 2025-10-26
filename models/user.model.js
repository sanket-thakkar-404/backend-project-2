const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/test2db')

const userSchema = mongoose.Schema({
  name:String,
  age:Number,
  email : String,
  number:Number,
  role:String,
  image:String,
})


module.exports = mongoose.model("user" , userSchema)
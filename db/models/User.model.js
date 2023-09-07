const { bool, required } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name:{
      fName: {
        type: String,
        required: [true,'first name is required']
      },
      lName: {
        type: String,
        required: [true,'last name is required']
      }
    } ,
    passwordHash:{
      type:String,
      required: [true,'password is required'],
      min:5,
      max: 255
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required: true
    },
    address:{
        type: String,
        required: [true,'address  is required']
    },
    phoneNm:{
      code:{
        type: Number,
        required: [true,'code is required']
      },
      phoneNm:{
        type: Number,
        required: [true,'phone number is required']
      },
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      match: [/^\S+@\S+$/g, 'invalid email format'],
      min: 4,
      max: 255
    },
    addedOnDate: {
      type: Date,
      default: Date.now()
    }
  })); 

  validateUser = (usr) => {
    console.log('inside validation ')
    const schema = Joi.object({
      name: {
        fName:Joi.string().min(5).max(512).required(),
        lName:Joi.string().min(5).max(512).required(),
      },
      password: Joi.string().min(5).max(512).required(),

    });
    return (schema.validate(usr))

  }
  

module.exports = {
 User,
 validateUser
}

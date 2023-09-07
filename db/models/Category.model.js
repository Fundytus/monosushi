const Joi = require('joi');
const mongoose = require('mongoose');

const Category = mongoose.model('Category', new mongoose.Schema({
    name: {
      type: String,
      required: [true,'Name is required'],
      unique:[true,'This category name already exists, please choose another name ']
    },
    catImg:{
      type:String,
    },
    catDesc:{
      type:String,
    },
    addedOnDate:{
      type: Date,
      default: Date.now()
    },
    userId:{
      type:Object
    }
   
  })); 

const validateCategory = (cat) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      catImg: Joi.string(),
      catDesc: Joi.string(),
      userId: Joi.object(),
      addedOnDate: Joi.date()
    })
    // return Joi.valid(cat, schema);
    const { error, value } = schema.validate(cat)
    return { error, value }
  }
  
module.exports ={
 Category,
 validateCategory
}
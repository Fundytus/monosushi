const Joi = require('joi');
const mongoose = require('mongoose');

const Message = mongoose.model('Message', new mongoose.Schema({
    subject: {
      type: String,
      required: [true,'Name is required'],
      unique:[true,'This category name already exists, please choose another name ']
    },
    senderNm:{
      type:String,
    },
    comments:{
      type:String,
    },
    addedOnDate:{
      type: Date,
      default: Date.now()
    },
   
  })); 

// const validateMessage = (cat) => {
//     const schema = Joi.object({
//       name: Joi.string().required(),
//       catImg: Joi.string(),
//       catDesc: Joi.string(),
//       userId: Joi.object(),
//       addedOnDate: Joi.date()
//     })
//     // return Joi.valid(cat, schema);
//     const { error, value } = schema.validate(cat)
//     return { error, value }
//   }
  
module.exports ={
 Message,
//  validateCategory
}
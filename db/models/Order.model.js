const Joi = require('joi');
const mongoose = require('mongoose');

const Order = mongoose.model('Order', new mongoose.Schema({
   order:[{ 
    productId: {
      type: String,
      required:true,
    },
     productName: {
       type: String,
       required: true,
     },
    qty:{
      type:String,
    },
  }],
  addedOnDate:{
    type: Date,
    default: Date.now()
  },
  userId:{
    type:Object
  },
  userEmail: {
    type: String
  }
  })); 

const validateOrder = (cat) => {
    const schema = Joi.object({
      productId: Joi.string().required(),
      qty: Joi.string(),
      userId: Joi.object(),
      addedOnDate: Joi.date()
    })
    // return Joi.valid(cat, schema);
    const { error, value } = schema.validate(cat)
    return { error, value }
  }
  
module.exports ={
 Order,
 validateOrder
}
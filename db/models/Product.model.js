const {
  object
} = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');

const Product = mongoose.model('Product', new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true
  },
  productImg: {
    type: String
  },
  categoryId: {
    type: String,
  },
  ingredients: {
    type: String,
    required: [true, 'ingredients is required'],
    minLength: 4,
    maxLength: 128
  },
  weight: {
    type: Number,
    required: [true, 'weight is required']
  },
  price: {
    type: Number
  },
  addedOnDate: {
    type: Date,
    default: Date.now()
  },
  qty: {
    type: String,
    default:1
  },
  userId: {
    type: Object
  }
}));

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string(),
    productImg: Joi.string(),
    ingredients: Joi.string().required(),
    weight: Joi.number().required(),
    categoryId: Joi.string(),
    price: Joi.number(),
    userId: Joi.object(),
    addedOnDate: Joi.date()
  })
  // return Joi.valid(cat, schema);
  const {
    error,
    value
  } = schema.validate(product)
  return {
    error,
    value
  }
}


module.exports = {
  Product,
  validateProduct
}
const {Product, validateProduct} = require('../db/models/Product.model')

const getAllProducts = async (req, res) => {
  try{
    const products = await Product.find()
    res.send(products)
  }
  catch(err){
    res.send({message:'Something went wrong, please try later'})
  }
}  


const getProducts = async (req, res) => {
  try{
    const catId = req.params.id
    const products = await Product.find({categoryId:catId})
    res.send(products)
  }
  catch(err){
    res.send({message:'Something went wrong, please try later'})
  }
}

const createProduct =  async (req, res) => { 
  const data = req.body
  data.userId = req.loggedInUser._id

  const {error} = validateProduct(data)
  if (!error) {
    try{
      let product = await new Product(data);
      product = await product.save()
      res.send({
        product,
        message: 'Product saved successfully'
      });
      return
    }
  catch(err){
    console.log(err)

    res.send({message:'Something went wrong, please try later'})
    } 
  }
}

const updateProduct = async (req, res) => {
  const {error} = validateProduct(req.body)

  if(!error){
    try{
      const product = await Product.findByIdAndUpdate(req.params.id, req.body)
      if (!product) return res.status(404).send({message:'The product with the given ID was not found.'});
      res.send({
        product,
        message: 'Product updated successfully'
      });
    }
    catch(err){
      res.send({message:'Something went wrong, please try later'})
    }
  }
}

const deleteProduct = async (req, res) => {
  try{
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send({message:'The product with the given ID was not found.'});
    res.send({
      product,
      message: 'Product deleted successfully!'
    });
  }
  catch(err){
    res.send({message:'Something went wrong, please try later'})
    }

}

const getProduct = async (req, res) => {
  try{
    const product = await Product.findById(req.params.id).exec();
    if (!product) return res.status(404).send({message:'The categoty with the given ID was not found.'});
    res.send(product);
  }
  catch(err){
    res.send({message:'Something went wrong, please try later'})
  }
}

module.exports ={
    getAllProducts,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct
  }
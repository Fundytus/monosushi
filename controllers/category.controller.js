const {Category, validateCategory} = require('../db/models/Category.model')

const getAllCategories = async (req, res) => {
  try{
    const categories = await Category.find();
    res.send(categories);
  }
  catch(err){
    res.send({message:'Something went wrong, please try later'})
  }
}
  
  
const createCategory =  async (req, res) => {  
    const data = req.body
    
    data.userId = req.loggedInUser._id
    const {error} = validateCategory(data)
    if (!error) {
      try{
        let category = await new Category(data);
        // category.userId = req.loggedInUser._id
        category = await category.save()
        res.send({category,message:'Category saved successfuly'});
        return
      }
      catch(err){
        if(err.code === 11000)
          res.send({message:'This category name already exists, please choose another name'})
        else
          res.send({message:'Something went wrong, please try later'})
        
        }
      }
  }
  
const updateCategory = async (req, res) => {
  const {error} = validateCategory(req.body)
  if(!error){
    try{
      const category = await Category.findByIdAndUpdate(req.params.id, req.body)
      if (!category) return res.status(404).send('The categoty with the given ID was not found.');
      res.send({category,message:'Category updated successfuly'});
    }
    catch(err){
      if(err.code === 11000)
        res.send({message:'This category name already exists, please choose another name'})
      else
        res.send({message:'Something went wrong, please try later'})
      }
  }
}

const deleteCategory = async (req, res) => {
  try{
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).send({message:'The categoty with the given ID was not found.'});
    res.send(category);
  }
  catch(err){
    res.send({message:'Something went wrong, please try later'})

    }
  }

const getCategory = async (req, res) => {
  try{
    const category = await Category.findById(req.params.id).exec();
    if (!category) return res.status(404).send('The categoty with the given ID was not found.');
    res.send(category);
  }
  catch(err){
    res.send({message:'Something went wrong, please try later'})

    }
  }

module.exports ={
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory
  }
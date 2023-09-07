const {Message} = require('../db/models/Message.model')
const createMessage =  async (req, res) => {  
    const data = req.body
    
    // data.userId = req.loggedInUser._id
    // const {error} = validateCategory(data)
    // if (!error) {
      try{
        let message = await new Message(data);
        // category.userId = req.loggedInUser._id
        message = await message.save()
        res.send({message,message:'Message saved successfuly'});
        return
      }
      catch(err){
        if(err.code === 11000)
          res.send({message:'This category name already exists, please choose another name'})
        else
          res.send({message:'Something went wrong, please try later'})
        
        }
    //   }
  }
  module.exports={
    createMessage,
  }
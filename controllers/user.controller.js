const {User} = require('../db/models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).exec()

    if (!user) {
      res.status(401).send({'message':'Incorrect email or password'})
      return
    }
  
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    if (!isValidPassword) {
      res.status(401).send({'message':'Incorrect email or password'})
      return
    }
   
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '3h'
    })
    // const payload = jwt.verify(token,'')
    console.log(token)
    res.send({'token':token,user})//,payload)
  } catch (e) {
    res.status(500).send({'message':'Something went wrong. Please try again shortly!'})
  }
}
const getUser =  async(req,res) =>{
  try{
      const user = await User.findOne({_id:req.loggedInUser._id},{passwordHash:0})
      if(!user){
        res.send({'message':'User dos not exist'})
      }
      res.send(user)
  }
  catch(err)
  {
    res.send({'errMsg':'Something went wrong'})

  }
}

const register =  async (req, res) => {
  try {
      const email = req.body.email
      const password = req.body.password
      if (!email || !password) {
        res.status(422).send('Wrong email or password')
      }
      const passwordHash = await bcrypt.hash(password, 10)
      const user = req.body
      user.passwordHash = passwordHash
      console.log(user)
      let newUser = await new User(user); 
      newUser = await newUser.save()
      res.send(newUser)
      return
     
      }
  catch (err) {
      if(err.code === 11000)
        res.send({message:'This email already exists, please choose another name'})
      else
        res.send({message:'Something went wrong, please try later'})
    
    }
}


module.exports = {
  login,
  register,
  getUser
}
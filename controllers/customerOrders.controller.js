const {
  Order
} = require('../db/models/Order.model')

const createOrders = async (req, res) => {
  const data = req.body
  console.log(data)
  // const {error} = validateCategory(data)
  // if (!error) {
  //   try{
  const customerOder = []
  await data.forEach(async (product) => {
    let neworder = {}
    neworder.productId = product._id
    neworder.productName = product.name
    neworder.qty = product.qty
    customerOder.push(neworder)
    console.log(customerOder)
  });
  let orders = {}
  orders.order = customerOder
  orders.userId = req.loggedInUser._id
  orders.userEmail = req.loggedInUser.email
  let order = await new Order(orders);
  order = await order.save()
  res.send({
    message: 'Orders saved successfuly',
    order
  });
}

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (err) {
    res.send({
      message: 'Something went wrong, please try later'
    })
  }
}

module.exports = {
  createOrders,
  getAllOrders
}
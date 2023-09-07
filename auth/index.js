const { User } = require("../db/models/User.model");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) {
      //res.redirect('../login')
      res.status(401).send("unauthorized");
      return;
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
      // res.redirect('../public/login')
      res.status(401).send("unauthorized");
      return;
    }
    const user = await User.findOne({ email: payload?.email }).exec();
    console.log("insideAuth", user);
    if (!user) {
      //  res.redirect('../public/login')
      res.status(401).send("unauthorized");
    }

    if (!req.loggedInUser) {
      Object.defineProperty(req, "loggedInUser", {
        value: user,
        writable: false,
      });
      console.log("loggedInUSer:", req.loggedInUser);
    } else {
      throw new Error("loggedInUser property already exists");
    }
    next();
  } catch (err) {
    res.redirect("index");
  }
};

const adminAuth = async (req, res, next) => {
  if (!req.loggedInUser.isAdmin) {
    res.status(401).send("unauthorized");
    return;
  }
  next();
};
// const adminAuth = async (req, res, next) => {
//   if (req.loggedInUser.role !== 'admin') {
//     res.status(401).send('unauthorized')
//     return
//   }
//   next()
// }
module.exports = {
  auth,
  adminAuth
};

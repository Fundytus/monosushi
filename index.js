require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const {
  getAllCategories,
  deleteCategory,
  createCategory,
  updateCategory,
  getCategory,
} = require("./controllers/category.controller");
const {
  login,
  register
} = require("./controllers/user.controller");
const {
  getAllProducts,
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("./controllers/product.controller");
const {
  auth,
  adminAuth
} = require("./auth");
const upload = require("./middleware/image");
const {
  createOrders,
  getAllOrders
} = require("./controllers/customerOrders.controller");
const { getUser } = require("./controllers/user.controller");
const { createMessage } = require("./controllers/messages.controller");
const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
const app = express();
const uri = `mongodb+srv://ivannahaiovska:ivanka19950701@cluster0.1yel3bv.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.post("/api/v1/users/login", login);
app.post("/api/v1/users/register", register);

app.route("/api/v1/viewProducts/:id").get((req, res) => {
  console.log("===================");
  res.render("products");
});

app.route("/api/v1/viewProducts").post((req, res) => {
  console.log(req.body);
  res.render("products");
  console.log("render");
});

app.use(auth);
app.get("/api/v1/user", getUser);

app.get("/api/v1/categories", getAllCategories);
app.get("/api/v1/products", getAllProducts);
app.get("/api/v1/orders", getAllOrders);
app.get("/api/v1/products/:id", getProducts); //catId
app.get("/api/v1/product/:id", getProduct);
app.post("/api/v1/orders", createOrders);

app.use(adminAuth);

app.post("/api/v1/categories", upload.single("catImg"), createCategory);
app.patch("/api/v1/categories/:id", upload.single("catImg"), updateCategory);
app.delete("/api/v1/categories/:id", deleteCategory);
app.get("/api/v1/categories/:id", getCategory);
app.post("/api/v1/products", upload.single("productImg"), createProduct);
app.patch("/api/v1/products/:id", upload.single("productImg"), updateProduct);
app.delete("/api/v1/products/:id", deleteProduct);

app.get("*", (req, res) => res.send("404 Not Found"));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

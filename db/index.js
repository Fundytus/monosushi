const mongoose = require('mongoose');

// construct the db connection uri
module.exports = () => {
  const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME
  } = process.env;
  const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.1yel3bv.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
  mongoose.connect(uri).catch((err) => {
    console.error(err);
  });
  mongoose.connection.on("open", () => {
    console.log("mongoose connected successfully");
  });
};

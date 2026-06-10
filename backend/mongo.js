require("dotenv").config();

const mongoose = require("mongoose");
// eslint-disable-next-line no-undef
const connectionString = process.env.DB_URI

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(err);
  });

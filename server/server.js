const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

//Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Cors
app.use(cors());

//Databese connection
const databese = process.env.CONNECTION_URL;

//Port connection
const port = process.env.PORT || 5000;

//Mongo db connection
mongoose
  .connect(databese, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Donnected"))
  .catch((err) => console.log(err));

//Listen to port
app.listen(port, () => console.log(`Listening on port: ${port}`));

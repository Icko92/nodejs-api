const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const mainRouter = require("./router/main-router");

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
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Donnected"))
  .catch((err) => console.log(err));

//Router
app.use(mainRouter);

//Listen to port
app.listen(port, () => console.log(`Listening on port: ${port}`));

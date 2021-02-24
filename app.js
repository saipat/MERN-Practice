//To import Mongoose
const mongoose = require('mongoose');
//To create a new Express server
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send('Hello World!!'));


//To deploy on Heroku || to run locally on port 5000
const port = process.env.PORT || 5000;

//To start the socket and lisen for connection
app.listen(port, () => console.log(`Server is running on port ${port}`));
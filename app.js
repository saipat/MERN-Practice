//To import Mongoose
const mongoose = require('mongoose');
//To create a new Express server
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;

const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');
//to parse the JSON that we send to the FE
const bodyParser = require('body-parser');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send('Hello World!!'));
app.use("/api/users", users);
app.use("/api/tweets", tweets);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json);


//To deploy on Heroku || to run locally on port 5000
const port = process.env.PORT || 5000;

//To start the socket and lisen for connection
app.listen(port, () => console.log(`Server is running on port ${port}`));
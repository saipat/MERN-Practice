//To import Mongoose
const mongoose = require('mongoose');
//To create a new Express server
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
//to parse the JSON that we send to the FE
const bodyParser = require('body-parser');
//to authenticate our token and construct private routes
const passport = require('passport');

//Routes
const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');

//Models
const User = require('./models/User');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
    // debugger;
    const user = new User({
        handle: 'test',
        email: 'test@gmail.com',
        password: 'test12345'
    });
    user.save();
    res.send('Hello World!!')
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
//to setup a configuration file for Passport
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/tweets", tweets);


//To deploy on Heroku || to run locally on port 5000
const port = process.env.PORT || 5000;

//To start the socket and lisen for connection
app.listen(port, () => console.log(`Server is running on port ${port}`));
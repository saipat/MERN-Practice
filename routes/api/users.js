const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../../models/User');

router.get("/test", (req,res) => res.json({msg: "This is users route"}));
router.post("/register", (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if(user){
                //Throw status 400 err if the user is already registered
                return res.status(400).json({email: "User has already registered"});
            }else{
                //Otherwise create a new user
                const newUser =  new User({
                    handle: req.body.handle,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                    });
                });

                newUser.save().then(user => res.send(user)).catch(err =>res.send(err));
            }
        })
});

module.exports = router;
const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
    
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.password, salt);

    // Create an user object
    const user = new User({
        name: req.body.name,
        password: hasPassword,
		avatar_url: req.body.avatar_url,
        status: req.body.status || 1
    });
    // Save User in the database
    try {
        const id = await User.create(user);
        user.id = id;
        delete user.password;
        res.send(user);
    }
    catch (err){
        res.status(500).send(err);
    }    
};

exports.login = async (req, res) => {
    try {
        // Check user exist
        const user = await User.login(req.body.name);
        if (user) {
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) return res.status(400).send("Username or password is wrong");

            // Create and assign token
            const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET);
            res.header("auth-token", token).send({"token": token});
            // res.send("Logged IN");
        }
    }
    catch (err) {
        if( err instanceof NotFoundError ) {
            res.status(401).send(`Username or password is wrong`);
        }
        else {
            let error_data = {
                entity: 'User',
                model_obj: {param: req.params, body: req.body},
                error_obj: err,
                error_msg: err.message
            };
            res.status(500).send("Error retrieving User");
        }
    }   
    
};
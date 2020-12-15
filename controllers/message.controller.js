const User = require("../models/message.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.list = async (req, res) => {
    
	try {
		const messages = await Message.list(req.id1,req.id2)
		res.send(messages)
	}
	catch(err){
		res.status(400).send(err)
	}
};

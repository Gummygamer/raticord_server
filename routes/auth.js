const router = require('express').Router();
const loggedIn = require("../helpers/auth.middleware");
const userController = require('../controllers/user.controller');
const messageController = require('../controllers/message.controller');

// Register a new User
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

router.get('/messages',messageController.list);

module.exports = router;
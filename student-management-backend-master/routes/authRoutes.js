const express = require('express');
const router = express.Router();
const { registerUser, loginUser,setPassword } = require('../controller/authController');

router.post('/register', registerUser);
router.post("/set-password/:token", setPassword);
router.post('/login', loginUser);


module.exports = router;

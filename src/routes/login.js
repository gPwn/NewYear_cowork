const express = require("express");
const authLoginUserMiddleware = require('../middlewares/authLoginUserMiddleware');
const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();


const router = express.Router();
require('dotenv').config();

router.post('/', loginController.login

)
module.exports = router;
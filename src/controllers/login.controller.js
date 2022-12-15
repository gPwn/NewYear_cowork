const express = require("express");
const LoginService = require('../services/login.service');
// const { InvalidParamsError } = require('../exceptions/index.exception');

require('dotenv').config({ path: '../.env' });

class LoginController {
  constructor() {
    this.loginService = new LoginService();
  }

  /**
    * @param {import("express").request} req - express Request
    * @param {import("express").response} res - express Response
    * **/

  login = (async (req, res) => {
    try {
      const { loginId, password } = req.body;

      const resultUser = await this.loginService.findUser(loginId, password)

      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60);

      const token = await this.loginService.createToken(resultUser.userId)
      res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, {
        expires: expires,
      });
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).send({
        errorMessage: '로그인에 실패하였습니다.',
      });
    }
  });
}
module.exports = LoginController;

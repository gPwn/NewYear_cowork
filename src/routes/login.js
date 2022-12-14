const express = require("express");
const Joi = require('joi');
const { Users } = require('../models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const authLoginUserMiddleware = require('../middlewares/authLoginUserMiddleware');

const router = express.Router();
require('dotenv').config();

router.post('/', authLoginUserMiddleware, async (req, res) => {
try {
    const { loginId, password } = req.body;
    const user = await Users.findOne({
        where: {
            [Op.and]: [{ loginId }, { password }],
        },
    });

    if (!user) {
        return res.status(412).send({
            errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
        });
    }

    if (loginId !== user.loginId || password !== user.password) {
        return res.status(412).send({
            errorMessage: '닉네임 또는 패스워드가 일치하지 않습니다.',
        });
    }

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60);

    const token = jwt.sign(
        { userId: user.userId },
        process.env.SECRET_KEY,
        { expiresIn: "60m" }
      );

      res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, {
        expires: expires,
      });
      return res.status(200).json({ token });
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).send({
          errorMessage: '로그인에 실패하였습니다.',
        });
      }
    });

module.exports = router;

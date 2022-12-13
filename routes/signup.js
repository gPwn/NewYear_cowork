const express = require("express");
const Joi = require('Joi');
const { Users, sequelize, Sequelize } = require('../models');
const authLoginUserMiddware = require('../middlewares/authLoginUserMiddleware');

const router = express.Router();





router.post('/', async (req, res) => {
try {

const re_nickname = /^[a-zA-Z0-9]{3,10}$/;
const re_password = /^[a-zA-Z0-9]{4,30}$/;

const userSchema = Joi.object({
    nickname: Joi.string().pattern(re_nickname).required(),
    password: Joi.string().pattern(re_password).required(),
    confirm: Joi.string(),
  });

const { nickname, password, confirm } = await userSchema.validateAsync(
    req.body
);

const user = await Users.findAll ({
    attributes: ['userId'],
    where: {nickname},
})

if (password !== confirm) {
    return res.status(412).send({
    errorMessage: '패스워드가 일치하지 않습니다.',
    });
}
// if (nickname.search(re_nickname) === -1) {
//     return res.status(412).send({
//     errorMessage: 'ID의 형식이 일치하지 않습니다.',
//     });
// }
if (password.search(re_nickname) === -1) {
    return res.status(412).send ({
    errorMessage: '패스워드에 닉네임이 포함되어 있습니다.',
    }); // 작동 안함
}

// const user = await Users.findAll({
//     attributes: ['userId'],
//     where: { nickname },
// });

if (user.length) { 
return res.status(412).send({
    errorMessage: '중복된 닉네임입니다.',
}); //으악 작동안됨
}

// CreatedAt과 UpdatedAt을 지정해주지 않아도 자동으로 값이 입력됨
await Users.create({ nickname, password });
console.log(`${nickname} 님이 가입하셨습니다.`);

res.status(201).send({message: '회원 가입에 성공하였습니다.'});
} catch (error) {
    console.log(error)
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send({
        errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
    });
}
});

function isRegexValidation(target, regex) {
    return target.search(regex) !== -1;
}

module.exports = router;

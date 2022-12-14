const express = require("express");
const Joi = require('Joi');
const { Users, sequelize, Sequelize } = require('../models');
const authLoginUserMiddware = require('../middlewares/authLoginUserMiddleware');

const router = express.Router();

// controller란? 무엇일까? 
// 데이터의 흐름을 파악을 해라 
// 클라이언트에서 API를 요청 -> /signup (post) body = {loginId, nickname, password, confirm}
// -> controller에서 이거를 받는 곳이라고 생각하면됨



router.post('/', async (req, res) => {
    // async -> 비동기
    // 동기가 안된다 -> 왜? -> 프로그래밍은 순차적으로 처리를 한다 위에서부터 아래까지
    // 3초 뒤에 처리하고 다시 진행하고 싶은 작업이 있다. 그럴때 사용하는게 async await
    try {

        // 구조분해 할당
        const { loginId, nickname, password, confirm } = req.body;



        //1. id 형식을 체크한다
        SignupService.checkLoginId(loginId)

        //2. 비밀번호 형식을 체크한다.
        SignupService.checkPassword(password)


        //3.기타등등 체크를 하고 



        console.log(`${nickname} 님이 가입하셨습니다.`);





        res.status(201).send({message : '회원 가입에 성공하였습니다.'});
        // console.log(`${req.method} ${req.originalUrl} : ${error.message}`);


        res.status(400).send({
            errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
        });

    }catch(err){
        console.log(err)
    }
})


module.exports = router;

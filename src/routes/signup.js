const express = require("express");
const router = express.Router();

const authLoginUserMiddleware = require("../middlewares/authLoginUserMiddleware.js");

const SignupController = require("../controllers/signup.controller");
const signupController = new SignupController();

router.post('/', authLoginUserMiddleware, signupController.createSignup);


module.exports = router;

// router.post("/", authLoginUserMiddware, async (req, res) => {
//   try {
//     const { loginId, nickname, password, confirm } = req.body;

//     const user = await Users.findAll({
//       attributes: ["userId"],
//       where: { loginId },
//     });

//     if (password !== confirm) {
//       return res.status(412).send({
//         errorMessage: "패스워드가 일치하지 않습니다.",
//       });
//     }

//     function checkLoginId(loginId) {
//       const condition = /^[a-zA-Z0-9]{3,10}$/;
//       return condition.test(loginId);
//     }
//     if (checkLoginId(loginId) === false) {
//       res.status(412).send({ errorMessage: "ID의 형식이 일치하지 않습니다." });
//       return;
//     }

//     function checkPassword(password) {
//       const condition = /^[a-zA-Z0-9]{4,30}$/;
//       return condition.test(password);
//     }
//     if (checkPassword(password) === false) {
//       res
//         .status(412)
//         .send({ errorMessage: "password의 형식이 일치하지 않습니다." });
//       return;
//     }

//     if (isRegexValidation(password, loginId)) {
//       return res.status(412).send({
//         errorMessage: "패스워드에 닉네임이 포함되어 있습니다.",
//       });
//     }

//     if (user.length) {
//       return res.status(412).send({
//         errorMessage: "중복된 닉네임입니다.",
//       });
//     }

//     await Users.create({ loginId, nickname, password });
//     console.log(`${nickname} 님이 가입하셨습니다.`);

//     res.status(201).send({ message: "회원 가입에 성공하였습니다." });
//   } catch (error) {
//     console.log(error);
//     console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
//     res.status(400).send({
//       errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
//     });
//   }
// });

// function isRegexValidation(target, regex) {
//   return target.search(regex) !== -1;
// }

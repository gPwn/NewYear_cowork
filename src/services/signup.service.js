const signupRepository = require("../repositories/signup.repository");
class signupService {
  constructor() {
    this.signupRepository = new signupRepository();
  }

  findUser = async ({ userId }) => {
    const user = await this.signupRepository.findUser({ userId });
    return user;
  };

  createSingup = async ({ loginId, nickname, password, confirm }) => {
    function checkLoginId(loginId) {
      const condition = /^[a-zA-Z0-9]{3,10}$/;
      return condition.test(loginId);
    }
    if (checkLoginId(loginId) === false) {
      res.status(412).send({ errorMessage: "ID의 형식이 일치하지 않습니다." });
      return;
    }

    function checkPassword(password) {
      const condition = /^[a-zA-Z0-9]{4,30}$/;
      return condition.test(password);
    }
    if (checkPassword(password) === false) {
      res
        .status(412)
        .send({ errorMessage: "password의 형식이 일치하지 않습니다." });
      return;
    }

    function isRegexValidation(target, regex) {
      return target.search(regex) !== -1;
    }
    if (isRegexValidation(password, loginId)) {
      return res.status(412).send({
        errorMessage: "패스워드에 닉네임이 포함되어 있습니다.",
      });
    }

    const isExistUser = await this.findUser({ loginId });
    if (isExistUser.length) {
      return res.status(412).send({
        errorMessage: "중복된 닉네임입니다.",
      });
    }

    const signup = await this.signupRepository.createSingup({
      loginId,
      nickname,
      password,
      confirm,
    });
    return signup;
  };
}

module.exports = signupService;

//   // 오류메세지 전달

//   // password 체크
//   // function checkPassword(password) {
//   //   const condition = /^[a-zA-Z0-9]{4,30}$/
//   //   return condition.test(password)
//   // }

//   // 오류메세지 전달

//   if (checkPassword(password) === false) {
//     res
//       .status(412)
//       .send({ errorMessage: "password의 형식이 일치하지 않습니다." })
//     return
//   }

//   //패스워드에서 형식이 잘못됨
//   if (isRegexValidation(password, loginId)) {
//     return res.status(412).send({
//       errorMessage: "패스워드에 닉네임이 포함되어 있습니다.",
//     })
//   }

//   //repository(DB를 연결해서 데이터를 가져오는 것)를 불러와야함

//   // 중복된 네임
//   if (user.length) {
//     return res.status(412).send({
//       errorMessage: "중복된 닉네임입니다.",
//     })
//   }
//   if (password !== confirm) {
//     return res.status(412).send({
//       errorMessage: "패스워드가 일치하지 않습니다.",
//     })
//   }
// }
// function isRegexValidation(target, regex) {
//   return target.search(regex) !== -1
// }
// }

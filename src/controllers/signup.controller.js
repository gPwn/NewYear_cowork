const signupService = require("../services/signup.service");

class SignupController {
  constructor() {
    this.SignupService = new signupService();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/

  createSignup = async (req, res) => {
    try {
      const { loginId, nickname, password, confirm } = req.body;

      const signup = await this.SignupService.createSignup({
        loginId,
        nickname,
        password,
        confirm,
      });

      console.log(`${nickname} 님이 가입하셨습니다.`);
      res.status(201).send({ message: "회원 가입에 성공하였습니다." });
    } catch (error) {
      console.log(error);
      res.status(error.status || 400);
      res.json({ errorMessage: error.message });
    }
  };
}

module.exports = SignupController;

// router.post("/", async (req, res) => {
//   // async -> 비동기
//   // 동기가 안된다 -> 왜? -> 프로그래밍은 순차적으로 처리를 한다 위에서부터 아래까지
//   // 3초 뒤에 처리하고 다시 진행하고 싶은 작업이 있다. 그럴때 사용하는게 async await
//   try {
//     // 구조분해 할당
//     const { loginId, nickname, password, confirm } = req.body;

//     //1. id 형식을 체크한다
//     SignupService.checkLoginId(loginId);

//     //2. 비밀번호 형식을 체크한다.
//     SignupService.checkPassword(password);

//     //3.기타등등 체크를 하고

//     console.log(`${nickname} 님이 가입하셨습니다.`);

//     res.status(201).send({ message: "회원 가입에 성공하였습니다." });
//     // console.log(`${req.method} ${req.originalUrl} : ${error.message}`);

//     res.status(400).send({
//       errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

const LoginRepository = require('../repositories/login.repository');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '../.env' });


class LoginService {
  constructor() {
    this.loginRepository = new LoginRepository();
  }

  findUser = async (nickname, password) => {

    const resultData = await this.loginRepository.findUser(nickname, password)
    if (nickname !== resultData.nickname || password !== resultData.password) {
      // return res.status(412).send({
      //     errorMessage: '닉네임 또는 패스워드가 일치하지 않습니다.',
      // });
      throw console.error('닉네임 또는 패스워드가 일치하지 않습니다.');
    }
    return resultData

  }

  createToken = async (userId) => {

    const token = jwt.sign(
      { userId: userId },
      process.env.SECRET_KEY,
      { expiresIn: "60m" }
    );
    return token
  }
}
module.exports = LoginService;
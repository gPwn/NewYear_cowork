const { Users } = require("../models");

class signupRepository {
  constructor() {}

  findAllPost = async ({}) => {
    const Signup = await Users.findAll({});
    return Signup;
  };

  createSignup = async ({
    loginId, nickname, password
  }) => {
    const singup = await Users.create({
      loginId,
      nickname,
      password
    });

    return singup;
  };
}
module.exports = signupRepository;

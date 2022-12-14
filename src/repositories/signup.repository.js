const { Users } = require("../models");

class signupRepository {
  constructor() {}
  findAllPost = async () => {
    const Signup = await Users.findAll({
      attributes: ["userId"],
      where: { loginId },
    });
    return Signup;
  };

  findUser = async ({ userId }) => {
    const user = await Users.findOne({
      where: { userId },
    });
    return user;
  };

  createSignup = async (loginId, nickname, password, confirm) => {
    const createSignupData = await Signup.create({
      loginId,
      nickname,
      password,
      confirm,
    });

    return createSignupData;
  };
}
module.exports = signupRepository;

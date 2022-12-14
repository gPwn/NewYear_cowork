import { LoginRepository } from "../repositories/login.repository"

const { Users } = require("../models")
const { Op } = require("sequelize")

export const LoginService = async (loginId, password) => {
  try {


    const resultData = await LoginRepository(loginId, password)

    //logic 부부분 처리 


  } catch (err) {
    console.log(err)
  }
}

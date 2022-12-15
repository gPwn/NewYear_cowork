const { Users } = require('../models');
const { Op } = require('sequelize');


class LoginRepository {

    findUser = async (nickname, password) => {

        const user = await Users.findOne({
            where: {
                [Op.and]: [{ nickname }, { password }],
            },
        });

        if (!user) {
            // return res.status(412).send({
            //     errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
            // });
            throw console.error('닉네임 또는 패스워드를 확인해주세요.');
        }
        return user

    }
}
module.exports = LoginRepository;
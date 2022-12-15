const { Users } = require('../models');
const { Op } = require('sequelize');



export const LoginRepository = async (loginId, password) =>{

    const user = await Users.findOne({
        where: {
            [Op.and]: [{ loginId }, { password }],
        },
    });


}

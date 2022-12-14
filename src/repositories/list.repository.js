const { Lists, Users } = require("../models");
const { user } = res.locals;

class listRepository {
    constructor() {}

    //리스트 조회 저장소
    getAllList = async({}) => {
        const lists = await Lists.findAll({
            include: [{ 
                model: Users, 
                attributes: ["nickname", "loginId"] 
            }],
            order: [["createdAt", "DESC"]]
        });
        return lists;
    };

    createList = async ({
        content,
        userId,
        loginId,
        nickname
    }) => {
        const lists =  await Lists.create({
            content,
            userId : user.userId,
            loginId : user.loginId,
            nickname : user.nickname
        });
        return lists;
    }



};

module.exports = listRepository;
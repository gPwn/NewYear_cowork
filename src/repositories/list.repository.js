const { Lists, Users } = require("../models");

class listRepository {
    constructor() {}
    
    //리스트 조회 저장소
    getAllList = async({}) => {
        const lists = await Lists.findAll({
            include: [{ 
                model: Users, 
            }],
            order: [["createdAt", "DESC"]]
        });
        return lists;
    };

    findUser = async ({userId}) => {
        const user = await Users.findOne({
            where : { userId }
        });
        return user;
    };

    findList = async ({listId}) => {
        const list = await Lists.findOne({
            where: { listId },
        });
        return list;
    };

    createList = async ({
        content,
        userId
    }) => {
        const lists = await Lists.create({
            content,
            userId,
        });
        return lists;
    };

    updateList = async ({
        content,
        listId,
    }) => {
        const list = await Lists.update({ content }, 
            { where: { listId } });
        return list;
    };

    deleteList = async ({
        listId,
    }) => {
        const list = await Lists.destroy(
            { where: { listId }
        });
        return list;
    };
};

module.exports = listRepository;
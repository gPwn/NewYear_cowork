const listRepository = require('../repositories/list.repository');

class listService {
    constructor() {
        this.listRepository = new listRepository();
    }
    
    //리스트 조회 서비스
    getAllList = async ({}) => {
        const list = await this.listRepository.getAllList({});

        const lists = list.map((e) => {
            return {
                listId : e.listId,
                loginId : e.User.loginId,
                nickname : e.User.nickname,
                content : e.content,
                createdAt : e.createdAt,
                updatedAt : e.updatedAt
            }
        });
        return lists;
    };

    createList = async ({
        content,
        userId,
        loginId,
        nickname
    }) => {
        
    };



};

module.exports = listService;
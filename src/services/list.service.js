const listRepository = require('../repositories/list.repository');
const { ValidationError, ExistError } = require('../exceptions/index.exception');

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

    findUser = async ({userId}) => {
        const user = await this.listRepository.findUser({userId});
        return user;
    };

    findList = async ({listId}) => {
        const user = await this.listRepository.findList({listId});
        return user;
    };

    createList = async ({
        content,
        userId
    }) => {
        if (content.length === 0) {
            throw new ExistError(
                'content에 내용을 입력해주세요.'
            )
        }

        const lists = 
            await this.listRepository.createList({
                content,
                userId,
        });
        return lists;
    };

    updateList = async ({
        content,
        listId,
        userId
    }) => {
        const isExistList = await this.findList({listId})
        console.log(isExistList);
        if (isExistList === null) {
            throw new ExistError(
                '변경할 리스트가 존재하지 않습니다.'
            )
        } else if (isExistList.userId !== userId) {
            throw new ValidationError(
                '리스트 변경할 권한이 없습니다.'
            )
        }

        if (content.length === 0) {
            throw new ExistError(
                'content에 내용을 입력해주세요.'
            )
        }

        const list = 
            await this.listRepository.updateList({
                content,
                listId,
        });
        return list;
    };

    deleteList = async ({
        listId,
        userId
    }) => {
        const isExistList = await this.findList({listId})
        
        if (isExistList === null) {
            throw new ExistError(
                '삭제할 리스트가 존재하지 않습니다.'
            )
        } else if (isExistList.userId !== userId) {
            throw new ValidationError(
                '리스트 삭제할 권한이 없습니다.'
            )
        }

        const list = 
        await this.listRepository.deleteList({
            listId,
        });
        return list;
    }
};

module.exports = listService;

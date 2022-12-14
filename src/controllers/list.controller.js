const listService = require('../services/list.service');

class ListController {
    constructor() {
        this.listService = new listService();
    }

    /**
     * @param {import("express").request} req - express Request
     * @param {import("express").response} res - express Response
     * **/
    //리스트 조회 컨트롤러
    getAllList = async (req, res) => {
        try {
        const lists = await this.listService.getAllList({});

    
        res.send({results : lists});
        } catch (error) {
        res.status(error.status || 400);
        res.json({errorMessage: "리스트 조회에 실패하였습니다."});
        }
    };

    createList = async (req, res) => {
        try {
            const { content } = req.body;

            if (content.length === 0) {
                return res.status(412).json({ errorMessage: "content에 내용을 입력해주세요" });
            }

            const lists = await this.listService.createList({
                content,
                userId,
                loginId,
                nickname
            });
            res.status(201).json({message: "신년 계획이 추가되었습니다."});
        } catch (error) {
            console.log(error);
            res.status(400).json({ errorMessage: "리스트 작성에 실패하였습니다." });
        }
    };



};

module.exports = ListController;

// router.get('/', async (req, res) => {
//     try {
//       const list = await Lists.findAll({
//         include: [{ 
//           model: Users, 
//           attributes: ["nickname", "loginId"] 
//         }],
//         order: [["createdAt", "DESC"]]
//       })
      
//       const lists = list.map((list) => {
//         return {
//           listId : list.listId,
//           loginId : list.User.loginId,
//           nickname : list.User.nickname,
//           content : list.content,
//           createdAt : list.createdAt,
//           updatedAt : list.updatedAt
//         }
//       });
  
//       return res.send({results : lists});
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json({errorMessage: "리스트 조회에 실패하였습니다."});
//     }
//   });

// router.post("/", authUserMiddleware, async (req, res) => {
//     const { content } = req.body;
//     const { user } = res.locals;

//     try {
//       if (content.length === 0) {
//         return res.status(412).json({ errorMessage: "content에 내용을 입력해주세요" });
//       }

//       await Lists.create({
//         content,
//         userId : user.userId,
//         loginId : user.loginId,
//         nickname : user.nickname
//       });
//       res.status(201).json({message: "신년 계획이 추가되었습니다."});
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({ errorMessage: "리스트 작성에 실패하였습니다." });
//     }
//   });
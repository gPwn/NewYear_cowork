
const listService = require('../services/list.service');

class ListController {
  constructor() {
      this.listService = new listService();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
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
        const { userId } = res.locals.user;
        const { content } = req.body;

        await this.listService.createList({
          content,
          userId,
        });
        
        res.status(201).json({message: "신년 계획이 추가되었습니다."});
    } catch (error) {
      res.status(error.status || 400);
      res.json({ errorMessage: error.message });
    }
  };

  updateList = async (req, res) => {
    try 
      {
        const { listId } = req.params;
        const { content } = req.body;
        const { userId } = res.locals.user;

        await this.listService.updateList({
          content,
          listId,
          userId
        });

        return res.status(200).json({ message: "리스트 수정하였습니다." });
      } catch (error) {
        res.status(error.status || 400);
        res.json({ errorMessage: error.message });
      }
    };

    deleteList = async (req, res) => {
      try{
        const { listId } = req.params;
        const { userId } = res.locals.user;

        await this.listService.deleteList({
          listId,
          userId
        });
        return res.status(200).json({ message: "리스트가 삭제하였습니다." });
      } catch (error) {
        res.status(error.status || 400);
        res.json({ errorMessage: error.message });
      }
    };
};

module.exports = ListController;

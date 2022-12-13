const express = require("express");
const router = express.Router();

const { Lists, Users } = require("../models");
const authUserMiddleware = require("../middlewares/authUserMiddleware.js");

router.post("/", authUserMiddleware, async (req, res) => {
    const { content } = req.body;
    const { user } = res.locals;

    try {
      if (content.length === 0) {
        return res.status(412).json({ errorMessage: "content에 내용을 입력해주세요" });
      }

      await Lists.create({
        content,
        userId : user.userId,
        loginId : user.loginId,
        nickname : user.nickname
      });
      res.status(201).json({message: "신년 계획이 추가되었습니다."});
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: "리스트 작성에 실패하였습니다." });
    }
  });

router.get('/', async (req, res) => {
    try {
      const list = await Lists.findAll({
        include: [{ model: Users, attributes: ["nickname", "loginId"] }]
      })
      
      const lists = [];
      list.forEach((list) => {
        lists.push ({
          listId : list.listId,
          loginId : list.User.loginId,
          nickname : list.User.nickname,
          content : list.content,
          createdAt : list.createdAt,
          updatedAt : list.updatedAt
        })
      });
  
      return res.send({results : lists});
    } catch (error) {
      console.log(error);
      return res.status(400).json({errorMessage: "리스트 조회에 실패하였습니다."});
    }
  });

  router.put("/:listId", authUserMiddleware, async (req, res) => {
    try {
      const { listId } = req.params;
      const { content } = req.body;
      const { userId } = res.locals.user;
    
      if (!content) {
        return res.status(412).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
      }

      const changeList = await Lists.findOne({
        where: { listId },
      });
      if (changeList == null) {
        return res.status(404).json({ errorMessage: "변경할 리스트가 존재하지 않습니다." });
      }
      if (changeList.userId !== userId) {
        return res.status(404).json({ errorMessage: "리스트 변경할 권한이 없습니다." });
      }
    
      await Lists.update({ content }, { where: { listId } });
      return res.status(200).json({ message: "리스트 수정하였습니다." });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errorMessage: "리스트 수정에 실패하였습니다." });
    }
  });
  
  router.delete("/:listId",authUserMiddleware, async (req, res) => {
    try {
      let { listId } = req.params;
      const { userId } = res.locals.user
  
      const delList = await Lists.findOne({
        where: { listId },
      });

      const changeList = await Lists.findOne({
        where: { listId },
      });
      if (changeList == null) {
        return res.status(404).json({ errorMessage: "변경할 리스트가 존재하지 않습니다." });
      }
      if (changeList.userId !== userId) {
        return res.status(404).json({ errorMessage: "리스트 변경할 권한이 없습니다." });
      }
  
      await Lists.destroy({where: {listId}});
      return res.status(200).json({ message: "리스트가 삭제하였습니다." });
    } catch (error) {
      return res.status(400).json({ errorMessage: "리스트가 정상적으로 삭제되지 않았습니다." });
    }
  });

  module.exports = router;
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const { Lists } = require("../models");

//리스트 생성-현우님
router.post("/", async (req, res) => {
    console.log(req.body);
    const { content } = req.body;
    console.log(content);
    try {

      if (content.length === 0) {
        return res.status(412).json({ message: "content에 내용을 입력해주세요" });
      }

      await Lists.create({
        content: content,
      });
      res.status(201).json({ message: "신년 계획이 추가되었습니다." });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "리스트 작성에 실패하였습니다." });
    }
  });

//리스트 조회-혜주님
router.get('/', async (req, res) => {
    try {
      const list = await Lists.findAll();
      // console.log(list);
  
      const lists = list.map((list) => {
        return {
          listId : list.listId,
          content : list.content,
          createdAt : list.createdAt,
          updatedAt : list.updatedAt
        }
      });
  
      return res.send({results : lists});
    } catch (error) {
      console.log(error);
      return res.status(400).json({"errorMessage": "리스트 조회에 실패하였습니다."});
    }
  });


  // 게시글 수정-주향님

  router.put("/:listId", async (req, res) => {
    try {
    const { listId } = req.params;
    const { content } = req.body;
    // const { userId } = res.locals.user;
  
    if (!content) {
      return res.status(412).json({ msg: "데이터 형식이 올바르지 않습니다." });
    }
  
    const changeList = await Lists.findOne({
      where: { listId },
    });
    // 바꿀 게시글 정보를 못 찾을 경우
    if (changeList == null || changeList.length === 0) {
      return res.status(404).json({ msg: "리스트 조회에 실패하였습니다." });
    }
  
    // 작성자가 같을 경우에만 변경
    // if (userId === changeList.userId) {
    await Lists.update({ content }, { where: { listId } });
    return res.status(200).json({ msg: "리스트 수정하였습니다." });
    // }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "리스트 수정에 실패하였습니다." });
    }
  });
  
  
  //게시글 삭제-주향님
 
  router.delete("/:listId", async (req, res) => {
    try {
      let { listId } = req.params;
      // const { userId } = res.locals.user
  
      const delList = await Lists.findOne({
        where: { listId },
      });
  
      // 값을 못찾을 경우
      if (delList == null || delList.length === 0) {
        return res.status(404).json({ msg: "리스트가 존재하지 않습니다." });
      }
  
      // if (delList !== userId || userId == undefined) {
      //   throw err
      // }
  
      //모두 통과하면 게시글을 지움
      await Lists.destroy({where: {listId}});
      return res.status(200).json({ message: "리스트가 삭제하였습니다." });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "리스트가 정상적으로 삭제되지 않았습니다." });
    }
  });

  module.exports = router;
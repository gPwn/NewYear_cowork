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
      await Lists.create({
        content: content,
      });
      if (content.length === 0) {
        return res.status(412).json({ message: "content에 내용을 입력해주세요" });
      }
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

  module.exports = router;
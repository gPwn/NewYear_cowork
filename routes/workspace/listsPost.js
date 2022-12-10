const { request } = require("express");
const express = require("express");
const router = express.Router();
const { Lists } = require("../../models");

router.post("/posts", async (req, res) => {
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

module.exports = router;

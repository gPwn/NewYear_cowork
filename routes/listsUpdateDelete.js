const express = require('express');
const router = express.Router();

const { Users } = require("../models");
const { Lists } = require("../models");

// const auth = require("../middlewares/auth");
// const jwt = require("jsonwebtoken");

//게시글 조회 
router.get("/lists", async (req, res) => {
  try {                                                  
   
    const lists = await Posts.findAll({            // 내림차순 정렬
      raw: true,
      attributes: [
        "listId",
        "userId",
        "id",
        "nickname",
        "content",
        "createdAt",
        "updatedAt",
      ],
      
      order: [["createdAt","DESC"]],                  // 내림차순 정렬
    });

    res.status(200).json({ data: lists });
  } catch (error) {
    return res.status(400).json({ msg: "리스트 조회에 실패하였습니다." });
  }
});




// 게시글 수정

  router.put("/lists/:listsId", auth, async (req, res) => {
    try {
    const { listId } = req.params;
    const { content } = req.body;
    const { userId } = res.locals.user;
  
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
    if (userId === changeList.userId) {
      await Posts.update({ content, updateAt }, { where: { listId } });
      return res.status(200).json({ msg: "리스트 수정하였습니다." });
    }
    } catch (error) {
      return res.status(400).json({ msg: "리스트 수정에 실패하였습니다." });
    }
  });
  
  // # 401 게시글 삭제에 실패한 경우
  // {"errorMessage": "게시글이 정상적으로 삭제되지 않았습니다.”}
  
  
  //            게시글 삭제
 
  router.delete("./lists/:listsId", auth, async (req, res) => {
    try {
      let { listId } = req.params;
      const { userId } = res.locals.user
  
      const delList = await Lists.findOne({
        where: { listId },
      });
  
      // 값을 못찾을 경우
      if (delList == null || delList.length === 0) {
        return res.status(404).json({ msg: "리스트가 존재하지 않습니다." });
      }
  
      if (delList !== userId || userId == undefined) {
        throw err
      }
  
      //모두 통과하면 게시글을 지움
      await Lists.destroy({where: {ListId}});
      return res.status(200).json({ message: "리스트가 삭제하였습니다." });
    } catch (error) {
      return res.status(400).json({ msg: "리스트가 정상적으로 삭제되지 않았습니다." });
    }
  });

module.exports = router; 
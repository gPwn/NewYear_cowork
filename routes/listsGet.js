const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const { Lists } = require("../models");

// router.get('/get', (req, res) => {
//   res.send("Server: listGet");
// });

//리스트 생성
// router.post('/get', async (req, res) => {
//   try {
//     const { content } = req.body;

//     if (content.length === 0) {
//       return res.status(412).json({errormessage : "content에 내용을 입력해주세요."});
//     };

//     const lists = await Lists.create({
//       content : content,
//     });
//     // res.json({data : lists});
//     return res.status(201).json({ data : [{message: "신년 계획이 추가되었습니다."}, lists] });
//   } catch (error) {
//     // console.log(error);
//     return res.status(400).json({errormessage : "리스트 작성에 실패하였습니다."});
//   }
// });

//리스트 조회
router.get('/get', async (req, res) => {
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
    return res.status(400).json({"errorMessage": "리스트 조회에 실패하였습니다."});
  }
});

// // 리스트 수정
// router.put('/get/:listId', async (req, res) => {
//   try {
//     const { listId } = req.params;
//     const { content } = req.body;

//     const list = await Lists.findOne({
//       where: {
//         [Op.or] : [{listId : listId}]
//       },
//     });
    
//     if (list === null) {
//       return res.status(404).json({errorMessage : "리스트가 존재하지 않습니다."});
//     };
//     if (content.length === 0) {
//       return res.status(404).json({errorMessage : "수정할 내용을 입력해주세요."});
//     };
//     //추가
//     if (list.content === content) {
//       return res.status(404).json({errorMessage : "수정할 내용이 존재하지 않습니다."});
//     };

//     await Lists.update(
//       {content : content}, 
//       {where: 
//         {listId : listId}
//       });
//     return res.send({ "message": "리스트를 수정하였습니다."})
//   } catch (error) {
//     return res.status(400).json({errorMessage : "리스트 수정이 정상적으로 처리되지 않았습니다." });
//   }
// });

// //리스트 삭제
// router.delete('/get/:listId', async (req, res) => {
//   try {
//     const { listId } = req.params;

//     const list = await Lists.findOne({
//       where: {
//         [Op.or] : [{listId : listId}]
//       },
//     });
//     // console.log(list);

//     if (list === null) {
//       return res.status(404).json({errorMessage : "리스트가 존재하지 않습니다."})
//     };

//     const delList = await list.destroy();
//     if(delList === 0) {
//       return res.status(400).json({errorMessage : "리스트 삭제가 정상적으로 처리되지 않았습니다."});
//     };

//     return res.status(201).json({ message : "리스트를 삭제하였습니다."});
//   } catch(error) {
//     return res.status(400).json({errorMessage : "리스트 삭제가 정상적으로 처리되지 않았습니다."});
//   }
// })

// router.get('/get', (req, res) => {
//     res.send("Server: listGet");
//   });

module.exports = router;

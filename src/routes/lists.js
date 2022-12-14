const express = require("express");
const router = express.Router();

const authUserMiddleware = require("../middlewares/authUserMiddleware.js");

const ListController = require('../controllers/list.controller');
const listController = new ListController();


router.get('/', listController.getAllList);
router.post('/',authUserMiddleware , listController.createList);
router.put("/:listId", authUserMiddleware, listController.updateList);
router.delete("/:listId", authUserMiddleware, listController.deleteList);

module.exports = router;
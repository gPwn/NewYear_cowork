const express = require("express");
const router = express.Router();

router.use("/login", require("./users/login.js"));
router.use("/signup", require("./users/signup.js"));
router.use("/lists", require("./list/lists.js"));
// router.use("/lists", require("./workspace/listsPost.js"));
// router.use("/lists", require("./workspace/listsGet.js"));
// router.use("/lists", require("./workspace/listsUpdateDelete.js"));
// const config = require(__dirname + '/../config/config.js')[env];

router.get("/", (req, res) => {
  res.send("Server: api");
});

module.exports = router;

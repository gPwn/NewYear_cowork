const express = require('express');
const router = express.Router();

router.use('/login', require('./login.js'));
router.use('/signup', require('./signup.js'));
router.use('/lists', require('./lists.js'));
// router.use("/lists", require("./workspace/listsPost.js"));
// router.use("/lists", require("./workspace/listsGet.js"));
// router.use("/lists", require("./workspace/listsUpdateDelete.js"));
// const config = require(__dirname + '/../config/config.js')[env];

router.get('/', (req, res) => {
    res.send('Server: api cicdtest!! 성공 후 테스트!!22');
});

module.exports = router;

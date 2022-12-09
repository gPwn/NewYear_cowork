const express = require('express');
const router = express.Router();

router.use('/login', require('./login.js'));
router.use('/signup', require('./signup.js'));
router.use('/lists', require('./listsPost.js'));
router.use('/lists', require('./listsGet.js'));
router.use('/lists', require('./listsUpdateDelete.js'));

router.get('/', (req,res) => {
    res.send("Server: api");
})

module.exports = router;

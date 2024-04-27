// this page is ccurrently disabled because thre html in the public folder is statically served
const router = require('express').Router();
const path = require('path');

router.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});
module.exports = router;
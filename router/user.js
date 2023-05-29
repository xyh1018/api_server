const express = require('express')
// 创建路由对象
const router = express.Router()

router.post('/reguser', (req,res) => {
  res.send('reguser ok')
})

router.post('login', (req, res) => {
  res.send('login ok')
})

module.exports = router

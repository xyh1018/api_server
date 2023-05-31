const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入路由处理函数
const user_handler = require('../router_handler/user')
router.post('/reguser', user_handler.reguser)

router.post('/login', user_handler.login)

module.exports = router

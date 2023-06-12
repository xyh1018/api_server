const express = require('express')
const router = express.Router()
const my_handler = require('../router_handler/my')
const expressJoi = require('@escook/express-joi')
const { update_userinfo, update_pwd, update_pic } = require('../schema/my')
// 获取用户基本信息
router.get('/userinfo', my_handler.getUserinfo)
router.post('/userinfo', expressJoi(update_userinfo), my_handler.updateUserinfo)
router.post('/updatepwd', expressJoi(update_pwd), my_handler.updatepwd)
router.post('/updatepic', expressJoi(update_pic), my_handler.updatepic)
module.exports = router

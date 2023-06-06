/**
 * 路由方法
 */

// 导入数据库
const db = require('../db/index')
// 导入bcryptjs包 
const bcrypt = require('bcryptjs')
// 导入jwt
const jwt = require('jsonwebtoken')
// 导入全局配置文件
const config = require('../config')

exports.reguser = (req, res) => {
  const userinfo = req.body
  // sql语句
  const sqlSelect = 'select * from ev_users where username=?'
  // 检查用户名是否重复
  db.query(sqlSelect, [userinfo.username], function(err, results) {
    if (err) {
      return res.cc(err)
    }
    // 如果数据库返回的数组大于0,则用户名重复了
    if (results.length > 0) {
      return res.cc('用户名被占用,请更换其他用户名')
    }
    // 对用户密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    const sqlInsert = 'insert into ev_users set ?'
    db.query(sqlInsert, {username: userinfo.username, password: userinfo.password}, (err, results) => {
      if(err) {
        return res.cc(err)
      }
      if(results.affectedRows !== 1) {
        return res.cc('注册用户失败,稍后再试!')
      }
      res.cc('注册成功',0)
    })
  })
}

exports.login = (req, res) => {
  const userInfo =  req.body
  const sql = 'select * from ev_users where username=?'
  db.query(sql, userInfo.username, (err, results) => {
    if(err) {
      return res.cc(err)
    }
    if(results.length !== 1) {
      return res.cc(err)
    }
    // 比较密码是否相等
    const ok = bcrypt.compareSync(userInfo.password, results[0].password)
    if(!ok) {
      return res.cc('密码不正确!')
    }
    const user = {...results[0], password:'', user_pic:''}
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: '10h'})
    res.send({
      status: 0,
      message: '登录成功',
      token: tokenStr
    })
  })
}

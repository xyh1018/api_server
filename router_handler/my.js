const res = require('express/lib/response')
const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.getUserinfo = (req, res) => {
  const sql = 'select id, username, email, user_pic from ev_users where id=?'
  // express-jwt在解码token后,会把用户的信息存储在req.auth中
  db.query(sql, req.auth.id, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results < 1) {
      return res.cc('未查询到该用户的信息')
    }
    res.send({
      status: 0,
      message: '获取数据成功',
      data: results[0]
    })
  })
}
exports.updateUserinfo = (req, res) => {
  const data = req.body
  const sql = 'update ev_users set ? where id=?'
  db.query(sql, [data, data.id], (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.affectedRows !== 1) {
      return res.cc('修改用户信息失败')
    }
    res.cc('更新用户信息成功', 0)
  })
}
exports.updatepwd = (req, res) => {
  const pwd = bcrypt.hashSync(req.body.newpwd, 10)
  const oldpwd = req.body.oldpwd
  // 更新密码语句
  const updatesql = 'update ev_users set ? where id=?'
  // 查询用户原密码
  const selectsql = 'select password from ev_users where id=?'
  db.query(selectsql, req.auth.id, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    // 比较密码是否相等
    const ok = bcrypt.compareSync(oldpwd, results[0].password)
    if (!ok) {
      return res.cc('密码不正确')
    }
    db.query(updatesql, [{ password: pwd }, req.auth.id], (err, results) => {
      if (err) {
        return res.cc(err)
      }
      res.send({
        status: 0,
        message: '更新密码成功',
        data: results[0]
      })
    })
  })
}
exports.updatepic = (req, res) => {
  const pic = req.body.pic
  const sql = 'update ev_users set ? where id=?'
  db.query(sql, [{ user_pic:pic }, req.auth.id], (err, results) => {
    if (err) {
      return res.cc('更新头像失败')
    }
    res.send('更新用户头像成功')
  })
}

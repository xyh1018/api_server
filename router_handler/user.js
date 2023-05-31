const db = require('../db/index')
exports.reguser = (req, res) => {
  const userinfo = req.body
  console.log(userinfo);
  if (!userinfo.username || !userinfo.password) {
    return res.send({
      status: 1,
      message: '失败'
    })
  }
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, [userinfo.username], function(err, results) {
    if (err) {
      return res.send({ status: 1, message: err.message })
    }
    if (results.length > 0) {
      return res.send({ status: 1, message: '用户名被占用,请更换其他用户名' })
    }
    res.send('成功!')
  })
}

exports.login = (req, res) => {
  res.send('login ok!')
}

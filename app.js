// 导入expess
const express = require('express')
// 导入cros中间件
const cors = require('cors')
const app = express()
const joi = require('joi')
const userRouter = require('./router/user')
const myRouter = require('./router/my')
const { expressjwt: jwt } = require('express-jwt')
const config = require('./config')

// 配置解析表单的中间件
// 只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  res.cc = function(err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})
app.use(jwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({path: [/^\/api/]}))
app.use('/api',userRouter)
app.use('/my',myRouter)
app.use(cors())

// 全局错误中间件
app.use((err, req, res, next) => {
  if(err instanceof joi.ValidationError) {
    return res.cc(err)
  }
  if(err.name === 'UnauthorizedError') {
    return res.cc('身份认证失败')
  }
  res.cc(err)
})   

app.listen(1000, function () {
  console.log('api server running at http://127.0.0.1:1000');
})

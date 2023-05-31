// 导入expess
const express = require('express')
// 导入cros中间件
const cors = require('cors')
const app = express()
const userRouter = require('./router/user')

// 配置解析表单的中间件
// 只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({ extended: false }))
app.use('/api',userRouter)
app.use(cors())

app.listen(1000, function () {
  console.log('api server running at http://127.0.0.1:1000');
})

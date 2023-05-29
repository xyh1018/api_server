// 导入expess
const express = require('express')
// 导入cros中间件
const cors = require('cros')
const app = express()


app.use(cors())
// 配置解析表单的中间件
// 只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({extended: false}))
app.listen(1000, function () {
  console.log('api server running at http://127.0.0.1:1000');
})

const joi = require('joi')

const id = joi.string().required()
const username = joi.string().min(1).max(10).required()
const email = joi.string().pattern(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).required()
const user_pic = joi.string().required()

exports.update_userinfo = {
  body: {
    id,
    username,
    email,
    user_pic
  }
}
exports.update_pwd = {
  body: {
    oldpwd: joi.string().required(),
    newpwd: joi.string().required().invalid(joi.ref('oldpwd')).messages({ 'any.invalid': '新密码不能与旧密码相同' })
  }
}
// invalid()方法用于指定字段的无效值或不允许的值
// joi.ref()方法引用定义的键的值
exports.update_pic = {
  body: {
    pic: joi.string().required().error(new Error('用户头像地址不能为空'))
  }
}

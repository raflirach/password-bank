const { cekToken } = require('../helpers/jwt')
const { User, Password } = require('../models')

const authenticate = async (req,res,next) => {
  try {
    const decode = cekToken(req.headers.access_token)

    const user = await User.findOne({
      where: { email: decode.email }
    })
    if(user){
      req.user = decode
      next()
    }else{
      next({name: 'errorAuthenticate'})
    }
  } catch (err) {
    next(err)
  }
}

const authorize = async (req,res,next) => {
  try {
    const { id } = req.params
    const pass = await Password.findOne({
      where: {id}
    })
    if(pass){
      if(pass.UserId == req.user.id){
        next()
      }else{
        next({name: "errorAuthorize"})
      }
    }else{
      next({name: 'errorNotFound'})
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  authenticate,
  authorize
}
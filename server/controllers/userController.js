const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')

class UserController {
  static async register(req,res,next){
    try {
      const { email,password } = req.body
      const user = await User.create({
        email: email || '',
        password: password || ''
      })
      res.status(201).json({
        id: user.id,
        email: user.email
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req,res,next){
    try {
      const { email,password } = req.body
      const user = await User.findOne({
        where: {email: email || ''}
      })
      if(user){
        const match = comparePassword(password ? password : '', user.password)
        if(match){
          const payload = {
            id: user.id,
            email: user.email
          }
          const access_token = generateToken(payload)
          res.status(200).json({access_token})
        }else{
          next({name: 'errorLogin'})
        }
      }else{
        next({name: 'errorLogin'})
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController
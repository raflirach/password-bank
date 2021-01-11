const { Password } = require('../models')

class PassController {
  static async create(req,res,next){
    try {
      const { name, url, password, username } = req.body
      console.log(req.body);
      const input = {
        name: name ? name : '',
        url: url ? url : '',
        password: password ? password : '',
        username: username ? username : '',
        UserId: req.user.id
      }
      const pass = await Password.create(input)
      res.status(201).json({
        id: pass.id,
        UserId: pass.UserId,
        name: pass.name,
        url: pass.url,
        password: pass.password,
        username: pass.username
      })
    } catch (err) {
      next(err)
    }
  }

  static async showPassword(req,res,next){
    try {
      const UserId = req.user.id
      const pass = await Password.findAll({
        where: { UserId }
      })
      res.status(200).json(pass)
    } catch (err) {
      next(err)
    }
  }

  static async delete(req,res,next){
    try {
      const { id } = req.params
      const pass = await Password.destroy({
        where: {id}
      })
      if(pass){
        res.status(200).json({message:"Delete Password successfull"})
      }else{
        next({name: "errorNotFound"})
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = PassController
const errorHandler = (err,req,res,next) => {
  if(err){
    switch (err.name) {
      case "SequelizeValidationError":
        res.status(400).json({
          status : `error`,
          message: err.errors.map(e => e.message)
        })
        break;
      case "SequelizeValidationError":
        res.status(400).json({
          status : `error`,
          message: err.errors.map(e => e.message)
        })
        break;
      case "errorLogin": 
        res.status(401).json({
          status : `error`,
          message: `invalid username / password`
        })
        break;
      case "errorAuthenticate": 
        res.status(401).json({
          status : `error`,
          message: `you need to login first`
        })
        break;
      case "errorNotFound": 
        res.status(404).json({
          status : `error`,
          message: `not found`
        })
        break;
      case "errorAuthorize":
        res.status(404).json({
          status : `error`,
          message: `you dont have access`
        })
        break;

      default:
        res.status(500).json({
          status : `error`,
          err: err
        })
        break;
    }
  }
}

module.exports = {
  errorHandler
}
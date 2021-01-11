'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Password extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Password.belongsTo(models.User)
    }
  };
  Password.init({
    url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg : `url must be filled`
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg : `name must be filled`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg : `url must be filled`
        },
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg : `username must be filled`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Password',
  });
  return Password;
};
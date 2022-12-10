'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false,                       // NOT NULL, Null을 허용하지 않음 
        autoIncrement: true,
        primaryKey: true,                       // PRIMARY KEY, 기본키
        type: Sequelize.DataTypes.INTEGER,      
      },

     
      id: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
            
      },

      nickname: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
        
      },
    
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
   },
    
  {
          sequelize,
          modelName: 'Users',
  });
         return Users;
};
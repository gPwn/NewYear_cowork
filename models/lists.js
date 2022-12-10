'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lists.init(
    {
    listId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    userId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "userId",
      },
      onDelete: "cascade",
    },

    id: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "cascade",    //ON UPDATE CASCADE 를 설정하면 UPDATE 를 할 때 CASCADE 옵션이 적용
    },

    nickname: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Users",
        key: "nickname",
      },
      onDelete: "cascade",
    },
   
    content: {
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
        modelName: 'Lists',
    
    }
  
    );

  return Lists;
};
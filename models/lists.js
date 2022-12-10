"use strict";
const { Model } = require("sequelize");
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
        // autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        required: true,
        type: DataTypes.STRING,
      },
      content: {
        required: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Lists",
    }
  );
  return Lists;
};

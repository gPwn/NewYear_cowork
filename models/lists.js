"use strict";
const { Model } = require("sequelize");

Model.sync({ force: true})

module.exports = (sequelize, DataTypes) => {
  class Lists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.User, { foreignKey: "userId" });
      this.hasMany(models.User, {foreignKey : "userId", as : "us" })
      // Shop.hasMany(ShopAd, {foreignKey : 'shop_id', as : 'ads'});
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
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "userId",
        },
      },
      // ID : {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   // unique: true,
      // },
      // nickname: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   // unique: true,
      // },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Lists",
    }
  );
  return Lists;
};

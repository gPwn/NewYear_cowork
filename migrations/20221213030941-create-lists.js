"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Lists", {
      listId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "userId",
        },
      },
      ID : {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      nickname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        // unique: true,
      },
      content: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Lists");
  },
};

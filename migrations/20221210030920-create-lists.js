'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lists', {
      listId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
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
    });
  },
  

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lists');
  }
};
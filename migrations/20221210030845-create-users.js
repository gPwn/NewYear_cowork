'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        allowNull: false,                       // NOT NULL, Null을 허용하지 않음 
        autoIncrement: true,
        primaryKey: true,
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
    });
  },
  

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
      
      
  
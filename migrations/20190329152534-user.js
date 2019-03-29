'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      iUserID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sUserEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sUserPass: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'user'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user');
  }
};

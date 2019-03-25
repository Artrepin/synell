'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('project', {
      iProjectID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sProjectImage: {
        type: Sequelize.STRING
      },
      sProjectLinkDemo: {
        type: Sequelize.STRING
      },
      sProjectLinkReady: {
        type: Sequelize.STRING
      },
      iProjectPeriod: {
        type: Sequelize.INTEGER
      },
      iProjectStaff: {
        type: Sequelize.INTEGER
      },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'project'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('project');
  }
};
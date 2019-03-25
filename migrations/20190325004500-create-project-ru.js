'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('project_ru', {
      iProjectID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'project',
          key: 'iProjectID',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      sProjectTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sProjectTechnology: {
        type: Sequelize.STRING
      },
      tProjectDesc: {
        type: Sequelize.TEXT
      },
      tProjectTask: {
        type: Sequelize.TEXT
      },
      tProjectWork: {
        type: Sequelize.TEXT
      },
      tProjectResult1: {
        type: Sequelize.STRING
      },
      tProjectResult2: {
        type: Sequelize.STRING
      },
      tProjectResult3: {
        type: Sequelize.STRING
      },
      tProjectResult4: {
        type: Sequelize.STRING
      },
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'project_ru'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('project_ru');
  }
};
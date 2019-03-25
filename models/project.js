'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('project', {
    iProjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sProjectImage:{
      type: DataTypes.STRING,
    },
    sProjectLinkDemo:{
      type: DataTypes.STRING,
    },
    sProjectLinkReady:{
      type: DataTypes.STRING,
    },
    iProjectPeriod: {
      type: DataTypes.INTEGER,
    },
    iProjectStaff: {
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'project'
  });
  Project.associate = function(models) {
    Project.belongsTo(models.project_ru, {
      foreignKey: 'iProjectID'
    })
    Project.belongsTo(models.project_en, {
      foreignKey: 'iProjectID'
    })
  };
  return Project;
};
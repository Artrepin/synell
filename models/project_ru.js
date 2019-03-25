'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project_ru = sequelize.define('project_ru', {
    iProjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    sProjectTitle:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    sProjectTechnology:{
      type: DataTypes.STRING,
    },
    tProjectDesc:{
      type: DataTypes.TEXT,
    },
    tProjectTask:{
      type: DataTypes.TEXT,
    },
    tProjectWork:{
      type: DataTypes.TEXT,
    },
    tProjectResult1:{
      type: DataTypes.STRING,
    },
    tProjectResult2:{
      type: DataTypes.STRING,
    },
    tProjectResult3:{
      type: DataTypes.STRING,
    },
    tProjectResult4:{
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'project_ru'
  });
  Project_ru.associate = function(models) {
    Project_ru.belongsTo(models.project, {
      foreignKey: 'iProjectID'
    })
  };
  return Project_ru;
};
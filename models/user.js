'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    iUserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sUserEmail:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    sUserPass:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'user'
  });
  User.associate = function(models) {

};
  return User;
};
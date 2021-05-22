const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userlogininfo', {
    UserLoginRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    LoginCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    LoginTime: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    UserRowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'UserRowId'
      }
    },
    LogOutTime: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'userlogininfo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UserLoginRowId" },
        ]
      },
      {
        name: "fk_UserRowId_in_UserLoginInfo_table",
        using: "BTREE",
        fields: [
          { name: "UserRowId" },
        ]
      },
    ]
  });
};

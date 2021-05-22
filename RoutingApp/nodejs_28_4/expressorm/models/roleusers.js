const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roleusers', {
    RoleUserId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RoleId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "RoleId"
    },
    UserRowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'UserRowId'
      }
    },
    RoleUserName: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'roleusers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RoleUserId" },
        ]
      },
      {
        name: "RoleId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RoleId" },
        ]
      },
      {
        name: "fk_UserRowId_in_RoleUsers_table",
        using: "BTREE",
        fields: [
          { name: "UserRowId" },
        ]
      },
    ]
  });
};

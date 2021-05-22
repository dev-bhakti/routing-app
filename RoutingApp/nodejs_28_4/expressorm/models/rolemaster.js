const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rolemaster', {
    RoleRowId: {
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
    Rolename: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'rolemaster',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RoleRowId" },
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
    ]
  });
};

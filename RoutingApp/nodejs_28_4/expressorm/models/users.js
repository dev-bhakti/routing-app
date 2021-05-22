const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    UserRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "UserId"
    },
    Username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    UserPassword: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UserRowId" },
        ]
      },
      {
        name: "UserId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UserId" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('categories', {
    CategoryRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CategoryId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "CategoryId"
    },
    CategoryName: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'categories',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CategoryRowId" },
        ]
      },
      {
        name: "CategoryId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CategoryId" },
        ]
      },
    ]
  });
};

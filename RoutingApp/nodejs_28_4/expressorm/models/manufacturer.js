const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('manufacturer', {
    ManufacturerRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ManufacturerId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "ManufacturerId"
    },
    ManufacturerName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    CategoryRowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'CategoryRowId'
      }
    }
  }, {
    sequelize,
    tableName: 'manufacturer',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ManufacturerRowId" },
        ]
      },
      {
        name: "ManufacturerId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ManufacturerId" },
        ]
      },
      {
        name: "fk_CategoryRowId_in_Manufacturer_table",
        using: "BTREE",
        fields: [
          { name: "CategoryRowId" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    ProductRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ProductId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "ProductId"
    },
    ProductName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ProductDescription: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ManufacturerRowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'manufacturer',
        key: 'ManufacturerRowId'
      }
    },
    CategoryRowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'CategoryRowId'
      }
    },
    ImagePath: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ProductRowId" },
        ]
      },
      {
        name: "ProductId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ProductId" },
        ]
      },
      {
        name: "fk_ManufacturerRowId_in_Product_table",
        using: "BTREE",
        fields: [
          { name: "ManufacturerRowId" },
        ]
      },
      {
        name: "fk_CategoryRowId_in_Product_table",
        using: "BTREE",
        fields: [
          { name: "CategoryRowId" },
        ]
      },
    ]
  });
};

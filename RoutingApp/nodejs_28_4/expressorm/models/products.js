const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    ProductRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "ProductRowId"
    },
    ProductId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    ProductName: {
      type: DataTypes.STRING(100),
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
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ProductId" },
        ]
      },
      {
        name: "ProductRowId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ProductRowId" },
        ]
      },
      {
        name: "fk_ManufacturerRowId_products_table",
        using: "BTREE",
        fields: [
          { name: "ManufacturerRowId" },
        ]
      },
      {
        name: "fk_CategoryRowId_products_table",
        using: "BTREE",
        fields: [
          { name: "CategoryRowId" },
        ]
      },
    ]
  });
};

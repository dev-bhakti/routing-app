const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productsvendors', {
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
    VendorRowId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    VendorId: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    VendorName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    VendorMobile: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Address: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'productsvendors',
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
        name: "fk_ManufacturerRowId_in_ProductsVendors_table",
        using: "BTREE",
        fields: [
          { name: "ManufacturerRowId" },
        ]
      },
      {
        name: "fk_CategoryRowId_in_ProductsVendors_table",
        using: "BTREE",
        fields: [
          { name: "CategoryRowId" },
        ]
      },
    ]
  });
};

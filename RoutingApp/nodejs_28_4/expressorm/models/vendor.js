const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vendor', {
    VendorRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    VendorId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "VendorId"
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
    tableName: 'vendor',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "VendorRowId" },
        ]
      },
      {
        name: "VendorId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "VendorId" },
        ]
      },
      {
        name: "fk_CategoryRowId_in_Vendor_table",
        using: "BTREE",
        fields: [
          { name: "CategoryRowId" },
        ]
      },
    ]
  });
};

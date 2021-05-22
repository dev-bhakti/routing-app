const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    OrderRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    OrderId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "OrderId"
    },
    OrderDate: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    OrderDeliverdate: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ProductRowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'ProductRowId'
      }
    },
    CustomerRowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customer',
        key: 'CustomerRowId'
      }
    },
    TotalBill: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    OrderDescription: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "OrderRowId" },
        ]
      },
      {
        name: "OrderId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "OrderId" },
        ]
      },
      {
        name: "fk_ProductRowId_in_Orders_table",
        using: "BTREE",
        fields: [
          { name: "ProductRowId" },
        ]
      },
      {
        name: "fk_CustomerRowId_in_Orders_table",
        using: "BTREE",
        fields: [
          { name: "CustomerRowId" },
        ]
      },
    ]
  });
};

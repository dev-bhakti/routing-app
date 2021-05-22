const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orderitem', {
    OrderItemRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    OrderItemId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "OrderItemId"
    },
    OrderItemDescription: {
      type: DataTypes.STRING(200),
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
    OrderRowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'OrderRowId'
      }
    },
    Quantity: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    orderStatus: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'orderitem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "OrderItemRowId" },
        ]
      },
      {
        name: "OrderItemId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "OrderItemId" },
        ]
      },
      {
        name: "fk_ProductRowId_in_OrderItem_table",
        using: "BTREE",
        fields: [
          { name: "ProductRowId" },
        ]
      },
      {
        name: "fk_OrderRowId_in_OrderItem_table",
        using: "BTREE",
        fields: [
          { name: "OrderRowId" },
        ]
      },
    ]
  });
};

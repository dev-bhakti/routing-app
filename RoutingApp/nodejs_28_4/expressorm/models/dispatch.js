const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dispatch', {
    DispatchRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DispatchId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "DispatchId"
    },
    DispatchDate: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    DeliveryDate: {
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
    OrderRowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'OrderRowId'
      }
    }
  }, {
    sequelize,
    tableName: 'dispatch',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "DispatchRowId" },
        ]
      },
      {
        name: "DispatchId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "DispatchId" },
        ]
      },
      {
        name: "fk_ProductRowId_in_Dispatch_table",
        using: "BTREE",
        fields: [
          { name: "ProductRowId" },
        ]
      },
      {
        name: "fk_OrderRowId_in_Dispatch_table",
        using: "BTREE",
        fields: [
          { name: "OrderRowId" },
        ]
      },
    ]
  });
};

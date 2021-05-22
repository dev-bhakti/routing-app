const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment', {
    PaymentRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PaymentId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "PaymentId"
    },
    PaymentType: {
      type: DataTypes.STRING(50),
      allowNull: false
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
    tableName: 'payment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PaymentRowId" },
        ]
      },
      {
        name: "PaymentId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PaymentId" },
        ]
      },
      {
        name: "fk_OrderRowId_in_Payment_table",
        using: "BTREE",
        fields: [
          { name: "OrderRowId" },
        ]
      },
    ]
  });
};

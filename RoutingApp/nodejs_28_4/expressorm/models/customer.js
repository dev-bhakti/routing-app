const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    CustomerRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CustomerId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "CustomerId"
    },
    CustomerName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    CustomerMobile: {
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
    City: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    State: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Country: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    CustomerPassword: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'customer',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CustomerRowId" },
        ]
      },
      {
        name: "CustomerId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CustomerId" },
        ]
      },
    ]
  });
};

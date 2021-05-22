const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('departments', {
    DeptNo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DeptName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Location: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'departments',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "DeptNo" },
        ]
      },
    ]
  });
};

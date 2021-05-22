const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('imagepath', {
    RowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ProductId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'product',
        key: 'ProductId'
      }
    },
    FieldName: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    OriginalName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Encoding: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Mimetype: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Destination: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    FileName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Path: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    size: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    img_path: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'imagepath',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RowId" },
        ]
      },
      {
        name: "fk_ProductId_in_ImagePath_table",
        using: "BTREE",
        fields: [
          { name: "ProductId" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subcategories', {
    SubCategoryRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    SubCategory: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "SubCategory"
    },
    SubCategoryName: {
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
    tableName: 'subcategories',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SubCategoryRowId" },
        ]
      },
      {
        name: "SubCategory",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SubCategory" },
        ]
      },
      {
        name: "fk_CategoryRowId_in_SubCategory_table",
        using: "BTREE",
        fields: [
          { name: "CategoryRowId" },
        ]
      },
    ]
  });
};

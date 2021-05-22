var DataTypes = require("sequelize").DataTypes;
var _categories = require("./categories");
var _customer = require("./customer");
var _departments = require("./departments");
var _dispatch = require("./dispatch");
var _imagepath = require("./imagepath");
var _manufacturer = require("./manufacturer");
var _orderitem = require("./orderitem");
var _orders = require("./orders");
var _payment = require("./payment");
var _product = require("./product");
var _products = require("./products");
var _productsvendors = require("./productsvendors");
var _rolemaster = require("./rolemaster");
var _roleusers = require("./roleusers");
var _subcategories = require("./subcategories");
var _userlogininfo = require("./userlogininfo");
var _usermaster = require("./usermaster");
var _users = require("./users");
var _vendor = require("./vendor");

function initModels(sequelize) {
  var categories = _categories(sequelize, DataTypes);
  var customer = _customer(sequelize, DataTypes);
  var departments = _departments(sequelize, DataTypes);
  var dispatch = _dispatch(sequelize, DataTypes);
  var imagepath = _imagepath(sequelize, DataTypes);
  var manufacturer = _manufacturer(sequelize, DataTypes);
  var orderitem = _orderitem(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var payment = _payment(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var productsvendors = _productsvendors(sequelize, DataTypes);
  var rolemaster = _rolemaster(sequelize, DataTypes);
  var roleusers = _roleusers(sequelize, DataTypes);
  var subcategories = _subcategories(sequelize, DataTypes);
  var userlogininfo = _userlogininfo(sequelize, DataTypes);
  var usermaster = _usermaster(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var vendor = _vendor(sequelize, DataTypes);

  manufacturer.belongsTo(categories, { as: "CategoryRow", foreignKey: "CategoryRowId"});
  categories.hasMany(manufacturer, { as: "manufacturers", foreignKey: "CategoryRowId"});
  product.belongsTo(categories, { as: "CategoryRow", foreignKey: "CategoryRowId"});
  categories.hasMany(product, { as: "products", foreignKey: "CategoryRowId"});
  products.belongsTo(categories, { as: "CategoryRow", foreignKey: "CategoryRowId"});
  categories.hasMany(products, { as: "products", foreignKey: "CategoryRowId"});
  productsvendors.belongsTo(categories, { as: "CategoryRow", foreignKey: "CategoryRowId"});
  categories.hasMany(productsvendors, { as: "productsvendors", foreignKey: "CategoryRowId"});
  subcategories.belongsTo(categories, { as: "CategoryRow", foreignKey: "CategoryRowId"});
  categories.hasMany(subcategories, { as: "subcategories", foreignKey: "CategoryRowId"});
  vendor.belongsTo(categories, { as: "CategoryRow", foreignKey: "CategoryRowId"});
  categories.hasMany(vendor, { as: "vendors", foreignKey: "CategoryRowId"});
  orders.belongsTo(customer, { as: "CustomerRow", foreignKey: "CustomerRowId"});
  customer.hasMany(orders, { as: "orders", foreignKey: "CustomerRowId"});
  product.belongsTo(manufacturer, { as: "ManufacturerRow", foreignKey: "ManufacturerRowId"});
  manufacturer.hasMany(product, { as: "products", foreignKey: "ManufacturerRowId"});
  products.belongsTo(manufacturer, { as: "ManufacturerRow", foreignKey: "ManufacturerRowId"});
  manufacturer.hasMany(products, { as: "products", foreignKey: "ManufacturerRowId"});
  productsvendors.belongsTo(manufacturer, { as: "ManufacturerRow", foreignKey: "ManufacturerRowId"});
  manufacturer.hasMany(productsvendors, { as: "productsvendors", foreignKey: "ManufacturerRowId"});
  dispatch.belongsTo(orders, { as: "OrderRow", foreignKey: "OrderRowId"});
  orders.hasMany(dispatch, { as: "dispatches", foreignKey: "OrderRowId"});
  orderitem.belongsTo(orders, { as: "OrderRow", foreignKey: "OrderRowId"});
  orders.hasMany(orderitem, { as: "orderitems", foreignKey: "OrderRowId"});
  payment.belongsTo(orders, { as: "OrderRow", foreignKey: "OrderRowId"});
  orders.hasMany(payment, { as: "payments", foreignKey: "OrderRowId"});
  dispatch.belongsTo(product, { as: "ProductRow", foreignKey: "ProductRowId"});
  product.hasMany(dispatch, { as: "dispatches", foreignKey: "ProductRowId"});
  imagepath.belongsTo(product, { as: "Product", foreignKey: "ProductId"});
  product.hasMany(imagepath, { as: "imagepaths", foreignKey: "ProductId"});
  orderitem.belongsTo(product, { as: "ProductRow", foreignKey: "ProductRowId"});
  product.hasMany(orderitem, { as: "orderitems", foreignKey: "ProductRowId"});
  orders.belongsTo(product, { as: "ProductRow", foreignKey: "ProductRowId"});
  product.hasMany(orders, { as: "orders", foreignKey: "ProductRowId"});
  roleusers.belongsTo(users, { as: "UserRow", foreignKey: "UserRowId"});
  users.hasMany(roleusers, { as: "roleusers", foreignKey: "UserRowId"});
  userlogininfo.belongsTo(users, { as: "UserRow", foreignKey: "UserRowId"});
  users.hasMany(userlogininfo, { as: "userlogininfos", foreignKey: "UserRowId"});

  return {
    categories,
    customer,
    departments,
    dispatch,
    imagepath,
    manufacturer,
    orderitem,
    orders,
    payment,
    product,
    products,
    productsvendors,
    rolemaster,
    roleusers,
    subcategories,
    userlogininfo,
    usermaster,
    users,
    vendor,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

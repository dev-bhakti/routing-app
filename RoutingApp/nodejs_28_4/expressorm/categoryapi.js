const express = require('express');
const cors = require('cors');
const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
// const ProductDal = require('./../../nodejs_28_4/expressorm/appdal');
const CategoryDal1 = require('./dal/subcategorydal');
let instance = express();


instance.use(express.urlencoded({extended:false}));
//middleware for working post api
instance.use(express.json());
instance.use(cors());

const CategoryDal = require('./dal/categorydal');
let catDal = new CategoryDal('Categories');
let catDal1 = new CategoryDal1('SubCategories');
instance.get('/api/categories',catDal.getAllCategories)
instance.get('/api/categories/:id',catDal.getCategoryById)
instance.post('/api/categories',catDal.addCategory)
instance.put('/api/categories/:id',catDal.updateCategory)
instance.delete('/api/categories/:id',catDal.deleteCategory)

instance.get('/api/subcategories',catDal1.getAllSubCategories)
instance.get('/api/subcategories/:id',catDal1.getSubCategoryById)
instance.post('/api/subcategories',catDal1.addSubCategory)
instance.put('/api/subcategories/:id',catDal1.updateSubCategory)
instance.delete('/api/subcategories/:id',catDal1.deleteSubCategory)

// instance.get('/api/categories/:id',prodDal.getDataById)
// instance.post('/api/categories',prodDal.addData)
// instance.put('/api/categories/:id',prodDal.updateData)
// instance.delete('/api/categories/:id',prodDal.deleteData)
instance.listen(9002,()=>{
    console.log('server started on port 9002');
});
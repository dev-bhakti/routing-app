const express = require('express');
const cors = require('cors');
const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
// const ProductDal = require('./../../nodejs_28_4/expressorm/appdal');

let instance = express();


instance.use(express.urlencoded({extended:false}));
//middleware for working post api
instance.use(express.json());
instance.use(cors());

const CategoryDal = require('./dal/subcategorydal');
let subcatDal = new CategoryDal('SubCategories');
instance.get('/api/subcategories',subcatDal.getAllSubCategories)
// instance.get('/api/categories/:id',prodDal.getDataById)
// instance.post('/api/categories',prodDal.addData)
// instance.put('/api/categories/:id',prodDal.updateData)
// instance.delete('/api/categories/:id',prodDal.deleteData)

instance.get('/api/subcategories/:id',subcatDal.getSubCategoryById)
instance.post('/api/subcategories',subcatDal.addSubCategory)
instance.put('/api/subcategories/:id',subcatDal.updateSubCategory)
instance.delete('/api/subcategories/:id',subcatDal.deleteSubCategory)



instance.listen(9090,()=>{
    console.log('server started on port 9090');
});
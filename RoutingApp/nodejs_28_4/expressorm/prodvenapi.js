const express = require('express');
const cors = require('cors');
const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
// const ProductDal = require('./../../nodejs_28_4/expressorm/appdal');
let instance = express();


instance.use(express.urlencoded({extended:false}));
//middleware for working post api
instance.use(express.json());
instance.use(cors());

const ProductVenDal = require('./dal/prodvendal');
// let prodDal = new ProductDal('Product','ProductRowId');
let prodvenDal = new ProductVenDal('Product');
instance.get('/api/prodvendor',prodvenDal.getAllProducts)
instance.get('/api/prodvendor/:id',prodvenDal.getProductsById)
instance.post('/api/prodvendor',prodvenDal.addProduct)
instance.put('/api/prodvendor/:id',prodvenDal.updateProduct)
instance.delete('/api/prodvendor/:id',prodvenDal.deleteProduct)


instance.listen(8086,()=>{
    console.log('server started on port 8086');
});
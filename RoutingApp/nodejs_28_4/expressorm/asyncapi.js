const express = require('express');
const cors = require('cors');
const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
// const ProductDal = require('./../../nodejs_28_4/expressorm/appdal');
let instance = express();
const RowId=''

instance.use(express.urlencoded({extended:false}));
//middleware for working post api
instance.use(express.json());
instance.use(cors());

const ProductDal = require('./dal/productdal');
// let prodDal = new ProductDal('Product','ProductRowId');
let prodDal = new ProductDal('Product');
instance.get('/api/product',prodDal.getAllProducts)
instance.get('/api/product/:id',prodDal.getProductsById)
instance.post('/api/product',prodDal.addProduct)
instance.put('/api/product/:id',prodDal.updateProduct)
instance.delete('/api/product/:id',prodDal.deleteProduct)


instance.listen(8081,()=>{
    console.log('server started on port 8081');
});


const express = require('express');
const cors = require('cors');
const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
// const ProductDal = require('./../../nodejs_28_4/expressorm/appdal');

let instance = express();


instance.use(express.urlencoded({extended:false}));
//middleware for working post api
instance.use(express.json());
instance.use(cors());

const CustomerDal = require('./dal/customerdal');
let custDal = new CustomerDal();
instance.get('/api/customers',custDal.getAllCustomers)
instance.get('/api/customers/:id',custDal.getCustomerById)
instance.post('/api/customers',custDal.addCustomer)
instance.put('/api/customers/:id',custDal.updateCustomer)
instance.delete('/api/customers/:id',custDal.deleteCustomer)
// let prodDal = new ProductDal('Customer','CustomerRowId');
// instance.get('/api/customers',prodDal.getData)
// instance.get('/api/customers/:id',prodDal.getDataById)
// instance.post('/api/customers',prodDal.addData)
// instance.put('/api/customers/:id',prodDal.updateData)
// instance.delete('/api/customers/:id',prodDal.deleteData)



instance.listen(8084,()=>{
    console.log('server started on port 8084');
});
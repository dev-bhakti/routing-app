const express = require('express');
const cors = require('cors');
const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
// const ProductDal = require('./../../nodejs_28_4/expressorm/appdal');

let instance = express();


instance.use(express.urlencoded({extended:false}));
//middleware for working post api
instance.use(express.json());
instance.use(cors());

const PaymentDal = require('./dal/paymentdal');
let payDal = new PaymentDal();
instance.get('/api/payment',payDal.getPayment)
instance.get('/api/payment/:id',payDal.getPaymentById)
instance.post('/api/payment',payDal.addPayment)
instance.put('/api/payment/:id',payDal.updatePayment)
instance.delete('/api/payment/:id',payDal.deletePayment)

// let prodDal = new ProductDal('Payment','PaymentRowId');
// instance.get('/api/payment',prodDal.getData)
// instance.get('/api/payment/:id',prodDal.getDataById)
// instance.post('/api/payment',prodDal.addData)
// instance.put('/api/payment/:id',prodDal.updateData)
// instance.delete('/api/payment/:id',prodDal.deleteData)



instance.listen(8087,()=>{
    console.log('server started on port 8087');
});
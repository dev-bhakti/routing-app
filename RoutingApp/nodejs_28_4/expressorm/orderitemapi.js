const express = require('express');
const cors = require('cors');
const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
// const ProductDal = require('./../../nodejs_28_4/expressorm/appdal');

let instance = express();


instance.use(express.urlencoded({extended:false}));
//middleware for working post api
instance.use(express.json());
instance.use(cors());

const OrderItemDal = require('./dal/orderitemdal');
let orItemDal = new OrderItemDal();
instance.get('/api/orderitem',orItemDal.getAllOrderItems)
instance.get('/api/orderitem/:id',orItemDal.getOrderItemsById)
instance.post('/api/orderitem',orItemDal.addOrderItem)
instance.put('/api/orderitem/:id',orItemDal.updateOrderItem)
instance.delete('/api/orderitem/:id',orItemDal.deleteOrderItem)


// let prodDal = new ProductDal('Orders','OrderRowId');
// instance.get('/api/orders',prodDal.getData)
// instance.get('/api/orders/:id',prodDal.getDataById)
// instance.post('/api/orders',prodDal.addData)
// instance.put('/api/orders/:id',prodDal.updateData)
// instance.delete('/api/orders/:id',prodDal.deleteData)


instance.listen(9092,()=>{
    console.log('server started on port 9092');
});
const express = require('express');
const cors = require('cors');
const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
// const ProductDal = require('./../../nodejs_28_4/expressorm/appdal');

let instance = express();


instance.use(express.urlencoded({extended:false}));
//middleware for working post api
instance.use(express.json());
instance.use(cors());

const OrderDal = require('./dal/ordersdal');
let ordDal = new OrderDal();
instance.get('/api/orders',ordDal.getAllOrders)
instance.get('/api/orders/:id',ordDal.getOrderById)
instance.post('/api/orders',ordDal.addOrder)
instance.put('/api/orders/:id',ordDal.updateOrder)
instance.delete('/api/orders/:id',ordDal.deleteOrder)


// let prodDal = new ProductDal('Orders','OrderRowId');
// instance.get('/api/orders',prodDal.getData)
// instance.get('/api/orders/:id',prodDal.getDataById)
// instance.post('/api/orders',prodDal.addData)
// instance.put('/api/orders/:id',prodDal.updateData)
// instance.delete('/api/orders/:id',prodDal.deleteData)


instance.listen(8083,()=>{
    console.log('server started on port 8083');
});
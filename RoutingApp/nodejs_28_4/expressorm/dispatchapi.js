const express = require('express');
const cors = require('cors');
const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
// const ProductDal = require('./../../nodejs_28_4/expressorm/appdal');

let instance = express();


instance.use(express.urlencoded({extended:false}));
//middleware for working post api
instance.use(express.json());
instance.use(cors());

const DispatchDal = require('./dal/dispatchdal');
let disDal = new DispatchDal();
instance.get('/api/dispatch',disDal.getDispatchDetails)
instance.get('/api/dispatch/:id',disDal.getDispatchDetailsById)
instance.post('/api/dispatch',disDal.addDispatch)
instance.put('/api/dispatch/:id',disDal.updateDispatch)
instance.delete('/api/dispatch/:id',disDal.deleteDispatch)

// let prodDal = new ProductDal('Dispatch','DispatchRowId');
// instance.get('/api/dispatch',prodDal.getData)
// instance.get('/api/dispatch/:id',prodDal.getDataById)
// instance.post('/api/dispatch',prodDal.addData)
// instance.put('/api/dispatch/:id',prodDal.updateData)
// instance.delete('/api/dispatch/:id',prodDal.deleteData)





instance.listen(8085,()=>{
    console.log('server started on port 8085');
});
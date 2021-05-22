const express = require('express');
const cors = require('cors');
const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
// const ProductDal = require('./../../nodejs_28_4/expressorm/appdal');
let instance = express();


instance.use(express.urlencoded({extended:false}));
//middleware for working post api
instance.use(express.json());
instance.use(cors());

const ManufacturerDal = require('./dal/manufacturerdal');
let manDal = new ManufacturerDal();
instance.get('/api/manufacturer',manDal.getManufacturers)
instance.get('/api/manufacturer/:id',manDal.getManufacturerById)
instance.post('/api/manufacturer',manDal.addManufacturer)
instance.put('/api/manufacturer/:id',manDal.updateManufacturer)
instance.delete('/api/manufacturer/:id',manDal.deleteManufacturer)


// let prodDal = new ProductDal('Manufacturer','ManufacturerRowId');
// instance.get('/api/manufacturer',prodDal.getData)
// instance.get('/api/manufacturer/:id',prodDal.getDataById)
// instance.post('/api/manufacturer',prodDal.addData)
// instance.put('/api/manufacturer/:id',prodDal.updateData)
// instance.delete('/api/manufacturer/:id',prodDal.deleteData)




instance.listen(8086,()=>{
    console.log('server started on port 8086');
});
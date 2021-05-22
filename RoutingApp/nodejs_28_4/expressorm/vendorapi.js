const express = require('express');
const cors = require('cors');
const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
// const ProductDal = require('./../../nodejs_28_4/expressorm/appdal');

let instance = express();


instance.use(express.urlencoded({extended:false}));
//middleware for working post api
instance.use(express.json());
instance.use(cors());

const VendorDal = require('./dal/vendordal');
let venDal = new VendorDal();
instance.get('/api/vendor',venDal.getVendor)
instance.get('/api/vendor/:id',venDal.getVendorById)
instance.post('/api/vendor',venDal.addVendor)
instance.put('/api/vendor/:id',venDal.updateVendor)
instance.delete('/api/vendor/:id',venDal.deleteVendor)


// let prodDal = new ProductDal('Vendor','VendorRoeId');
// instance.get('/api/vendor',prodDal.getData)
// instance.get('/api/vendor/:id',prodDal.getDataById)
// instance.post('/api/vendor',prodDal.addData)
// instance.put('/api/vendor/:id',prodDal.updateData)
// instance.delete('/api/vendor/:id',prodDal.deleteData)




instance.listen(8088,()=>{
    console.log('server started on port 8088');
});
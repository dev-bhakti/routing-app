const express = require('express');
const cors = require('cors');
const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
// const ProductDal = require('./../../nodejs_28_4/expressorm/appdal');

let instance = express();


instance.use(express.urlencoded({extended:false}));
//middleware for working post api
instance.use(express.json());
instance.use(cors());

const RoleMasterDal = require('./dal/rolemasterdal');
let roleM_Dal = new RoleMasterDal();
instance.get('/api/rolemaster',roleM_Dal.getRoleMaster)
instance.get('/api/rolemaster/:id',roleM_Dal.getRoleMasterById)
instance.post('/api/rolemaster',roleM_Dal.addRoleMaster)
instance.put('/api/rolemaster/:id',roleM_Dal.updateRoleMaster)
instance.delete('/api/rolemaster/:id',roleM_Dal.deleteRoleMaster)


// let prodDal = new ProductDal('RoleMaster','RoleRowId');
// instance.get('/api/rolemaster',prodDal.getData)
// instance.get('/api/rolemaster/:id',prodDal.getDataById)
// instance.post('/api/rolemaster',prodDal.addData)
// instance.put('/api/rolemaster/:id',prodDal.updateData)
// instance.delete('/api/rolemaster/:id',prodDal.deleteData)




instance.listen(8089,()=>{
    console.log('server started on port 8089');
});
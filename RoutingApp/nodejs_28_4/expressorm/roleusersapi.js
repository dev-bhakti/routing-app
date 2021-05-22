const express = require('express');
const cors = require('cors');
const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
// const ProductDal = require('./../../nodejs_28_4/expressorm/appdal');

let instance = express();


instance.use(express.urlencoded({extended:false}));
//middleware for working post api
instance.use(express.json());
instance.use(cors());

const RoleUsersDal = require('./dal/roleusersdal');
let roleUserDal = new RoleUsersDal();
instance.get('/api/roleuser',roleUserDal.getRoleUser)
instance.get('/api/roleuser/:id',roleUserDal.getRoleUserById)
instance.post('/api/roleuser',roleUserDal.addRoleUser)
instance.put('/api/roleuser/:id',roleUserDal.updateRoleUser)
instance.delete('/api/roleuser/:id',roleUserDal.deleteRoleUser)


// let prodDal = new ProductDal('RoleMaster','RoleRowId');
// instance.get('/api/rolemaster',prodDal.getData)
// instance.get('/api/rolemaster/:id',prodDal.getDataById)
// instance.post('/api/rolemaster',prodDal.addData)
// instance.put('/api/rolemaster/:id',prodDal.updateData)
// instance.delete('/api/rolemaster/:id',prodDal.deleteData)




instance.listen(9093,()=>{
    console.log('server started on port 9093');
});
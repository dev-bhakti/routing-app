const express = require('express');
const cors = require('cors');
const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
// const ProductDal = require('./../../nodejs_28_4/expressorm/appdal');

let instance = express();


instance.use(express.urlencoded({extended:false}));
//middleware for working post api
instance.use(express.json());
instance.use(cors());

const UserMasterDal = require('./dal/usermasterdal');
let userM_Dal = new UserMasterDal();
instance.get('/api/usermaster',userM_Dal.getUserMaster)
instance.get('/api/usermaster/:id',userM_Dal.getUserMasterById)
instance.post('/api/usermaster',userM_Dal.addUserMaster)
instance.put('/api/usermaster/:id',userM_Dal.updateUserMaster)
instance.delete('/api/usermaster/:id',userM_Dal.deleteUserMaster)


// let prodDal = new ProductDal('UserMaster','UserRowId');
// instance.get('/api/usermaster',prodDal.getData)
// instance.get('/api/usermaster/:id',prodDal.getDataById)
// instance.post('/api/usermaster',prodDal.addData)
// instance.put('/api/usermaster/:id',prodDal.updateData)
// instance.delete('/api/usermaster/:id',prodDal.deleteData)



instance.listen(8090,()=>{
    console.log('server started on port 8090');
});
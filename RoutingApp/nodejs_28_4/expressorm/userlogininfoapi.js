const express = require('express');
const cors = require('cors');
const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
// const ProductDal = require('./../../nodejs_28_4/expressorm/appdal');

let instance = express();


instance.use(express.urlencoded({extended:false}));
//middleware for working post api
instance.use(express.json());
instance.use(cors());

const UserLoginInfoDal = require('./dal/userlogininfodal');
let userLogin_Dal = new UserLoginInfoDal();
instance.get('/api/userlogin',userLogin_Dal.getUserLoginInfo)
instance.get('/api/userlogin/:id',userLogin_Dal.getUserLoginInfoById)
instance.post('/api/userlogin',userLogin_Dal.addUserLoginInfo)
instance.put('/api/userlogin/:id',userLogin_Dal.updateUserLoginInfo)
instance.delete('/api/userlogin/:id',userLogin_Dal.deleteUserLoginInfo)


// let prodDal = new ProductDal('UserLoginInfo','UserLoginRowId');
// instance.get('/api/userlogin',prodDal.getData)
// instance.get('/api/userlogin/:id',prodDal.getDataById)
// instance.post('/api/userlogin',prodDal.addData)
// instance.put('/api/userlogin/:id',prodDal.updateData)
// instance.delete('/api/userlogin/:id',prodDal.deleteData)



instance.listen(8091,()=>{
    console.log('server started on port 8091');
});
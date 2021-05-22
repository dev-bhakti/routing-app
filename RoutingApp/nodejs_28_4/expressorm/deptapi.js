const express = require('express');
const cors = require('cors');
const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
// const ProductDal = require('./../../nodejs_28_4/expressorm/appdal');

let instance = express();


instance.use(express.urlencoded({extended:false}));
//middleware for working post api
instance.use(express.json());
instance.use(cors());

const DepartmentDal = require('./dal/deptdal');
let deptDal = new DepartmentDal();
instance.get('/api/departments',deptDal.getAllDepartments)
instance.get('/api/departments/:id',deptDal.getDepartmentsById)
instance.post('/api/departments',deptDal.addDepartment)
instance.put('/api/departments/:id',deptDal.updateDepartment)
instance.delete('/api/departments/:id',deptDal.deleteDepartment)
// let prodDal = new ProductDal('Customer','CustomerRowId');
// instance.get('/api/customers',prodDal.getData)
// instance.get('/api/customers/:id',prodDal.getDataById)
// instance.post('/api/customers',prodDal.addData)
// instance.put('/api/customers/:id',prodDal.updateData)
// instance.delete('/api/customers/:id',prodDal.deleteData)



instance.listen(8094,()=>{
    console.log('server started on port 8094');
});
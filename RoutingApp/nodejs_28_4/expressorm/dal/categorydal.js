const { Sequelize, DataTypes, Model, ValidationError } = require('sequelize');
const path = require('path');
const { response } = require('express');
const sequelize = new Sequelize('eshoppingapp1', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});


const catModel = require(path.join(__dirname, './../models/Categories'))(sequelize, Sequelize.DataTypes);

const catModel1 = require(path.join(__dirname, './../models/SubCategories'))(sequelize, Sequelize.DataTypes);

class CategoryDal {
    async getAllCategories(request, response) {

        await sequelize.sync({ force: false }); // connect to database
        let rows = await catModel.findAll(); // return the resolverd data
        if (rows) {
            return response.status(200)
                .send({
                    statusMessage: 'Data is Read Successfully',
                    rowCount: rows.length,
                    rows: rows
                });
        }
        return response.status(500)
            .send({
                statusMessage: 'Error Occured',
                errorDetails: error.message
            });
    }
    async getAllSubCategories(request, response) {

        await sequelize.sync({ force: false }); // connect to database
        let rows = await catModel1.findAll(); // return the resolverd data
        if (rows) {
            return response.status(200)
                .send({
                    statusMessage: 'Data is Read Successfully',
                    rowCount: rows.length,
                    rows: rows
                });
        }
        return response.status(500)
            .send({
                statusMessage: 'Error Occured',
                errorDetails: error.message
            });
    }


    async getCategoryById(request,response){
        let id = parseInt(request.params.id);
        sequelize.sync({force:false})
                .then(()=> 
                catModel.findOne({where:
                            {CategoryRowId:id}
                        })) // process read operation
                .then((data)=>{
                    // 'data' is the recordSet
                    response.status(200)
                        .send({
                            statusMessage: 'Data is Read By Id Successfully',
                            rowCount:data.length,
                            rows:data
                        });
                })
                .catch((error)=>{
                    response.status(500)
                    .send({
                        statusMessage: 'Error Occured',
                        ErrorDetails: error.message
                    });
                });
    }

    async getSubCategoryById(request,response){
        let id = parseInt(request.params.id);
        sequelize.sync({force:false})
                .then(()=> 
                catModel1.findOne({where:
                            {SubCategoryRowId:id}
                        })) // process read operation
                .then((data)=>{
                    // 'data' is the recordSet
                    response.status(200)
                        .send({
                            statusMessage: 'Data is Read By Id Successfully',
                            rowCount:data.length,
                            rows:data
                        });
                })
                .catch((error)=>{
                    response.status(500)
                    .send({
                        statusMessage: 'Error Occured',
                        ErrorDetails: error.message
                    });
                });
    }



    async addCategory(request, response) {
        const objectToCreate = request.body;

        await sequelize.sync({ force: false });

        let record = await catModel.create(objectToCreate)
        if (record) {
            console.log(record);
            return response.status(200)
                .send({
                    statusMessage: 'Record Added Successfully',
                    record: record
                });
        }

        return response.status(500)
            .send({
                statusMessage: 'Error Occured',
                errorDetails: error.message
            });

    }

    async addSubCategory(request, response) {
        const objectToCreate = request.body;

        await sequelize.sync({ force: false });

        let record = await catModel1.create(objectToCreate)
        if (record) {
            return response.status(200)
                .send({
                    statusMessage: 'Record Added Successfully',
                    record: record
                });
        }

        return response.status(500)
            .send({
                statusMessage: 'Error Occured',
                errorDetails: error.message
            });

    }

    async updateCategory(req, res) {
        let id = parseInt(req.params.id);

        const objectToUpdate = req.body;

        sequelize.sync({ force: false })
            .then(() =>
            catModel.update({
                CategoryId: objectToUpdate.CategoryId,
                CategoryName: objectToUpdate.CategoryName
                }, { where: { CategoryRowId: id } })
            )
            .then((data) => {
                res.status(200)
                    .send({
                        statusMessage: 'Record Updated Successfully',
                        record: data
                    });
            })
            .catch((error) => {
                res.status(500)
                    .send({
                        statusMessage: 'Error Occured',
                        errorDetails: error.message
                    });
            });
    }

    async updateSubCategory(req, res) {
        let id = parseInt(req.params.id);

        const objectToUpdate = req.body;

        sequelize.sync({ force: false })
            .then(() =>
            catModel1.update({
                SubCategory: objectToUpdate.SubCategory,
                SubCategoryName: objectToUpdate.SubCategoryName
                }, { where: { SubCategoryRowId: id } })
            )
            .then((data) => {
                res.status(200)
                    .send({
                        statusMessage: 'Record Updated Successfully',
                        record: data
                    });
            })
            .catch((error) => {
                res.status(500)
                    .send({
                        statusMessage: 'Error Occured',
                        errorDetails: error.message
                    });
            });
    }

    async deleteCategory(req, res) {
        let id = parseInt(req.params.id);
        sequelize.sync({ force: false })
            .then(() =>
            catModel.destroy({
                    where:
                        { CategoryRowId: id }
                }))
            .then((data) => {
                // 'data' is the recordSet
                res.status(200)
                    .send({
                        statusMessage: 'Data is Deleted Successfully'
                    });
            })
            .catch((error) => {
                res.status(500)
                    .send({
                        statusMessage: 'Error Occured',
                        ErrorDetails: error.message
                    });
            });
    }
    async deleteSubCategory(req, res) {
        let id = parseInt(req.params.id);
        sequelize.sync({ force: false })
            .then(() =>
            catModel1.destroy({
                    where:
                        { SubCategoryRowId: id }
                }))
            .then((data) => {
                // 'data' is the recordSet
                res.status(200)
                    .send({
                        statusMessage: 'Data is Deleted Successfully'
                    });
            })
            .catch((error) => {
                res.status(500)
                    .send({
                        statusMessage: 'Error Occured',
                        ErrorDetails: error.message
                    });
            });
    }


}

module.exports = CategoryDal;
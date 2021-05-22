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


const venModel = require(path.join(__dirname, './../models/Vendor'))(sequelize, Sequelize.DataTypes);


class VendorDal {
    async getVendor(request, response) {

        await sequelize.sync({ force: false }); // connect to database
        let rows = await venModel.findAll(); // return the resolverd data
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

    async getVendorById(request,response){
        let id = parseInt(request.params.id);
        sequelize.sync({force:false})
                .then(()=> 
                venModel.findOne({where:
                            { VendorRowId :id}
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


    async addVendor(request, response) {
        const objectToCreate = request.body;

        await sequelize.sync({ force: false });

        let record = await venModel.create(objectToCreate)
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

    async updateVendor(req, res) {
        let id = parseInt(req.params.id);

        const objectToUpdate = req.body;

        sequelize.sync({ force: false })
            .then(() =>
            venModel.update({
                VendorId: objectToUpdate.VendorId,
                VendorName: objectToUpdate.VendorName,
                VendorMobile:objectToUpdate.VendorMobile,
                Email: objectToUpdate.Email,
                Address:objectToUpdate.Address,
                CategoryRowId:objectToUpdate.CategoryRowId,


                }, { where: { VendorRowId: id } })
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

    async deleteVendor(req, res) {
        let id = parseInt(req.params.id);
        sequelize.sync({ force: false })
            .then(() =>
            venModel.destroy({
                    where:
                        { VendorRowId: id }
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

module.exports = VendorDal;
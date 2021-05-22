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


const custModel = require(path.join(__dirname, './../models/Customer'))(sequelize, Sequelize.DataTypes);


class CustomerDal {
    async getAllCustomers(request, response) {

        await sequelize.sync({ force: false }); // connect to database
        let rows = await custModel.findAll(); // return the resolverd data
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

    async getCustomerById(request,response){
        let id = parseInt(request.params.id);
        sequelize.sync({force:false})
                .then(()=> 
                custModel.findOne({where:
                            { CustomerRowId :id}
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



    async addCustomer(request, response) {
        const objectToCreate = request.body;

        await sequelize.sync({ force: false });

        let record = await custModel.create(objectToCreate)
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

    async updateCustomer(req, res) {
        let id = parseInt(req.params.id);

        const objectToUpdate = req.body;

        sequelize.sync({ force: false })
            .then(() =>
            custModel.update({
                CustomerId: objectToUpdate.CustomerId,
                CustomerName: objectToUpdate.CustomerName,
                CustomerMobile:objectToUpdate.CustomerMobile,
                Email: objectToUpdate.Email,
                Address: objectToUpdate.Address,
                City:objectToUpdate.City,
                State:objectToUpdate.State,
                Country:objectToUpdate.Country,
                CustomerPassword:objectToUpdate.CustomerPassword,

                }, { where: { CustomerRowId: id } })
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

    async deleteCustomer(req, res) {
        let id = parseInt(req.params.id);
        sequelize.sync({ force: false })
            .then(() =>
            custModel.destroy({
                    where:
                        { CustomerRowId: id }
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

module.exports = CustomerDal;
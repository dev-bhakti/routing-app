const { Sequelize, DataTypes, Model, ValidationError } = require('sequelize');
const path = require('path');


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


// const prodModel = require(path.join(__dirname, './../models/Product'))(sequelize,Sequelize.DataTypes);

class ProductDal {
    prodModel = ''
    constructor(modelsVal) {
        this.prodModel = require(path.join(__dirname, './models/' + modelsVal))(sequelize, Sequelize.DataTypes);

    }
    getData = async (request, response) => {

        await sequelize.sync({ force: false }); // connect to database
        let rows = await this.prodModel.findAll(); // return the resolverd data
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

    getDataById = async (request, response) => {
        let id = parseInt(request.params.id);
        await sequelize.sync({ force: false });
        let row = await this.prodModel.findOne({ where: { ProductRowId: id } });
        if (row) {
            return response.status(200)
                .send({
                    statusMessage: 'Data Read By Id Successfully',
                    rows: row
                });
        }
        return response.status(500)
            .send({
                statusMessage: 'Error occured',
                errorDetails: error.message
            });
        // .then(()=> 
        // this.prodModel.findOne({where:
        //             {ProductRowId:id}
        //         })) // process read operation
        // .then((data)=>{
        //     // 'data' is the recordSet
        //     response.status(200)
        //         .send({
        //             statusMessage: 'Data is Read By Id Successfully',
        //             rowCount:data.length,
        //             rows:data
        //         });
        // })
        // .catch((error)=>{
        //     response.status(500)
        //     .send({
        //         statusMessage: 'Error Occured',
        //         ErrorDetails: error.message
        //     });
        // });
    }



    addData = async (request, response) => {
        try {
            const objectToCreate = request.body;

            await sequelize.sync({ force: false });

            let record = await this.prodModel.create(objectToCreate)
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
        } catch (error) {
            return response.status(500)
                .send({
                    statusMessage: 'Error Occured',
                    errorDetails: error.message
                });
        }


    }

    updateData = async (req, res) => {
        try {
            let id = parseInt(req.params.id);

            const objectToUpdate = req.body;

            await sequelize.sync({ force: false })
            let record = await this.prodModel.update(objectToUpdate, { where: { ProductRowId: id } })
            if (record) {
                return res.status(200)
                    .send({
                        statusMessage: 'Record edited successfully'
                    });
            }
            return res.status(500)
                .send({
                    statusMessage: 'Error occured',
                    errorDetails: error.message
                });
        } catch (e) {
            return res.status(500)
                .send({
                    statusMessage: 'Error record',
                    errorDetails: error.message
                });
        }
        // .then(()=> 
        // this.prodModel.update({
        //     ProductId:objectToUpdate.ProductId,
        //     ProductName: objectToUpdate.ProductName,
        //     ProductDescription:objectToUpdate.ProductDescription,
        //     Price:objectToUpdate.Price,
        //     Quantity:objectToUpdate.Quantity,
        //     ManufacturerRowId:objectToUpdate.ManufacturerRowId,
        //     CategoryRowId:objectToUpdate.CategoryRowId
        //     }, {where: {ProductRowId:id}})
        // )  
        // .then((data)=>{
        //     res.status(200)
        //         .send({
        //             statusMessage: 'Record Updated Successfully',
        //             record:data
        //         });
        // })
        // .catch((error)=>{
        //     res.status(500)
        //     .send({
        //         statusMessage: 'Error Occured',
        //         errorDetails: error.message
        //     });
        // });
    }

    deleteData = async (requset, response) => {
        let id = parseInt(requset.params.id);


        await sequelize.sync({ force: false })
            .then(() =>
                this.prodModel.destroy({
                    where:
                        { ProductRowId: id }
                }))
            .then((data) => {
                // 'data' is the recordSet
                response.status(200)
                    .send({
                        statusMessage: 'Data is Deleted Successfully'
                    });
            })
            .catch((error) => {
                response.status(500)
                    .send({
                        statusMessage: 'Error Occured',
                        ErrorDetails: error.message
                    });
            });
    }
}

module.exports = ProductDal;
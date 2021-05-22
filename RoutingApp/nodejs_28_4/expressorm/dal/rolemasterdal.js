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


const roleM_Model = require(path.join(__dirname, './../models/Rolemaster'))(sequelize, Sequelize.DataTypes);


class RoleMasterDal {
    async getRoleMaster(request, response) {

        await sequelize.sync({ force: false }); // connect to database
        let rows = await roleM_Model.findAll(); // return the resolverd data
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

    async getRoleMasterById(request,response){
        let id = parseInt(request.params.id);
        sequelize.sync({force:false})
                .then(()=> 
                roleM_Model.findOne({where:
                            { RoleRowId :id}
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


    async addRoleMaster(request, response) {
        const objectToCreate = request.body;

        await sequelize.sync({ force: false });

        let record = await roleM_Model.create(objectToCreate)
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

    async updateRoleMaster(req, res) {
        let id = parseInt(req.params.id);

        const objectToUpdate = req.body;

        sequelize.sync({ force: false })
            .then(() =>
            roleM_Model.update({
                RoleId: objectToUpdate.RoleId,
                Rolename: objectToUpdate.Rolename

                }, { where: { RoleRowId: id } })
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

    async deleteRoleMaster(req, res) {
        let id = parseInt(req.params.id);
        sequelize.sync({ force: false })
            .then(() =>
            roleM_Model.destroy({
                    where:
                        { RoleRowId: id }
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

module.exports = RoleMasterDal;
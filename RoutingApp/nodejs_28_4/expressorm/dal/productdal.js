const {Sequelize,DataTypes,Model, ValidationError} = require('sequelize');
const path  =require('path');
const { response } = require('express');
const sequelize = new Sequelize('eshoppingapp1', 'root', 'root',{
    host: 'localhost',
    dialect:'mysql',
    pool: {
        min:0, 
        max:5,
        idle:10000  
    },
    define:{
        timestamps:false
    }
});


const prodModel = require(path.join(__dirname, './../models/Product'))(sequelize,Sequelize.DataTypes);

class ProductDal {
    async getAllProducts(request,response){

        await sequelize.sync({force:false}); // connect to database
        let rows =  await prodModel.findAll(); // return the resolverd data
        if(rows){
            return response.status(200)
            .send({
                statusMessage: 'Data is Read Successfully',
                rowCount:rows.length,
                rows:rows
            });
        }
        return  response.status(500)
        .send({
            statusMessage: 'Error Occured',
            errorDetails: error.message
        });
    }
    async getProductsById(request,response){
        let id = parseInt(request.params.id);
        sequelize.sync({force:false})
                .then(()=> 
                prodModel.findOne({where:
                            {ProductRowId:id}
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

    

    async addProduct(request,response){
        const objectToCreate = request.body;

        await sequelize.sync({force:false});
        
        let record =  await prodModel.create(objectToCreate)
        if(record){
            return response .status(200)
                .send({
                    statusMessage: 'Record Added Successfully',
                    record:record
                });
        }
       
            return response.status(500)
            .send({
                statusMessage: 'Error Occured',
                errorDetails: error.message
            });
      
    }

    async updateProduct(req,res){
        let id  =parseInt(req.params.id);

    const objectToUpdate = req.body;

    sequelize.sync({force:false})
    .then(()=> 
    prodModel.update({
        ProductId:objectToUpdate.ProductId,
        ProductName: objectToUpdate.ProductName,
        ProductDescription:objectToUpdate.ProductDescription,
        Price:objectToUpdate.Price,
        Quantity:objectToUpdate.Quantity,
        ManufacturerRowId:objectToUpdate.ManufacturerRowId,
        CategoryRowId:objectToUpdate.CategoryRowId,
        ImagePath:objectToUpdate.ImagePath,
        }, {where: {ProductRowId:id}})
    )  
    .then((data)=>{
        res.status(200)
            .send({
                statusMessage: 'Record Updated Successfully',
                record:data
            });
    })
    .catch((error)=>{
        res.status(500)
        .send({
            statusMessage: 'Error Occured',
            errorDetails: error.message
        });
    });
    }

    async deleteProduct(requset,response){
        let id  =parseInt(requset.params.id);


    sequelize.sync({force:false})
    .then(()=> 
    prodModel.destroy({where:
                {ProductRowId:id}
            }))  
    .then((data)=>{
        // 'data' is the recordSet
        response.status(200)
            .send({
                statusMessage: 'Data is Deleted Successfully'
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
}

module.exports = ProductDal;
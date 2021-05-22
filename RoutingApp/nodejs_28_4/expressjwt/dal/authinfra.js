const {Sequelize,DataTypes,Model} = require('sequelize');
const path  =require('path');
const jwt = require('jsonwebtoken');
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

const jwtSecreteSettings = {
    jwtSecret : 'mi16james007700semaj61m'
};

const prodModel = require(path.join(__dirname, './../../expressorm/models/Product'))(sequelize,Sequelize.DataTypes);

const user_MModel = require(path.join(__dirname, './../../expressorm/models/UserMaster'))(sequelize,Sequelize.DataTypes);

class AuthLogic {
  
  async registerUser(req,resp){
        const user = req.body; 
        await sequelize.sync({force:false});
        
        const find = await user_MModel.findOne({where:{Username:user.Username}});
        if(find !== null) 
            
            return resp.status(409).send({message: `User ${user.Username} is already present`});
       
        const created = await user_MModel.create(user);   
        return resp.status(201).send({message: `User ${user.Username} is created sucessfully`, response:created}); 
  }

  
  async authUser(req,resp){
      let user = req.body;
      await sequelize.sync({force:false});
       
       const find = await user_MModel.findOne({where:{Username:user.Username}});  
       if(find === null) 
            return resp.status(404).send({message: `User ${user.Username} is Not found so please register`});
      
       if(find.UserPassword.trim() !== user.UserPassword.trim())   
             return resp.status(401).send({message: `The Password for User ${user.Username} is not found`});
       

       const token = jwt.sign({user}, jwtSecreteSettings.jwtSecret, {
           expiresIn: 3600
       }); 

  
       return resp.status(200).send({
           response: `User ${user.Username} is authenticated`,
           token:token
       });
  }


  async getdata(req,resp){
 

     if(req.headers.authorization === undefined){
        return resp.status(401).send({response: `Authorization failed, the auth header is missing in request`});
     } else {
       
        let receivedtoken = req.headers.authorization.split(" ")[1];
        
        await jwt.verify(receivedtoken, jwtSecreteSettings.jwtSecret, async(err,decode)=>{
            if(err)
                return resp.status(401).send({response: `Authorization failed, ${err}`});
          
            req.decode = decode; 
            
            await sequelize.sync({force:false});
            const data = await prodModel.findAll();
            return resp.status(200).send({response:data});   
        });
        
     }
  }
}

module.exports = AuthLogic;
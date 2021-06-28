const AWS =require('aws-sdk');
const util = require("./common");

module.exports.register = async (context, params) => {
    var mensajeText;
    var dbRegion = context.invokedFunctionArn.split(':')[3];  
    var documentClient = new AWS.DynamoDB.DocumentClient({region: dbRegion});

    try{
        await documentClient.put(params, function(err, data) {
            if (err) {
                mensajeText = util.cargaMensaje(201,err);
            } else {
                mensajeText = util.cargaMensaje(200,'Registro Satisfactorio');
            }
        }).promise();
        return mensajeText;
    }
    catch(err){
        mensajeText = util.cargaMensaje(500,"" + err);
        util.insertLog("Error en daoManager.register: " + err);
        return mensajeText;
    }
};
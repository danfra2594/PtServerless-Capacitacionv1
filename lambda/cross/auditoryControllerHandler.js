const daoManager = require("./../utilities/daoManager");
const util = require("./../utilities/common")

const auditoryTable = process.env.TABLE_AUDITORY;

module.exports.handler = async (event, context) => {
   
    try {
        var data = JSON.parse(event.Records[0].body);
        var params = { TableName : auditoryTable, Item: data };
        util.insertLog("Objeto para BD: " + JSON.stringify(params));
                
        const response = await daoManager.register(context,params);
        util.insertLog("Result Insert BD: " + JSON.stringify(response));
        return response;
    } catch (err) {
        util.insertLog("Error en auditoryControllerHandler: " + err);
        return util.cargaMensaje(500,"" + err);
    }     
};

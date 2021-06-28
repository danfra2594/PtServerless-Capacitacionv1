var smAWS = require('aws-sdk');
const util = require("./common");

module.exports.getSecret = async (context, secretId) => {
  var sqsRegion = context.invokedFunctionArn.split(':')[3];
  var response;

  try{
    util.insertLog("Identificando credenciales para proveedor con secretId: " + secretId + ". region: " + sqsRegion);

    var smClient = new smAWS.SecretsManager({ sqsRegion });
    response = await new Promise((resolve, reject) => {
      smClient.getSecretValue({ SecretId: secretId }, function (err, data) {
        if (err) {
          util.insertLog(err);
          reject(err);
        }
        else {
          util.insertLog("OK en getSecret");
          //util.insertLog(data);
          resolve(JSON.parse(data.SecretString));
        }
      });
    });
    
    return response;
  }
  catch(err){
    util.insertLog("Error en smManager.getSecret: " + err);
    return response;
  }
};

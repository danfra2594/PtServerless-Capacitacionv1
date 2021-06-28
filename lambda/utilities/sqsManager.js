var sqsAWS = require('aws-sdk');
const util = require("./common");

module.exports.sendMessage = async (context, messageInfo, queueName, delaySecondsToSQS) => {
  var sqsVersion = "20201221";
  var sqsRegion = context.invokedFunctionArn.split(':')[3];
  var accountId = context.invokedFunctionArn.split(':')[4];
  var queueUrl = "https://sqs." + sqsRegion + ".amazonaws.com/" + accountId + "/" + queueName;
  var delaySeconds = delaySecondsToSQS ? delaySecondsToSQS : 0;
  
  var params = {
      DelaySeconds: delaySeconds,
      MessageBody: JSON.stringify(messageInfo),
      QueueUrl: queueUrl
  };
  util.insertLog("Objeto para SQS: " + JSON.stringify(params));

  var mensajeText;
  sqsAWS.config.update({region: sqsRegion});
  var sqsClient = new sqsAWS.SQS({apiVersion: sqsVersion});

  try{
    await sqsClient.sendMessage(params, function(err, data) {
      if (err) {
        mensajeText = util.cargaMensaje(201, err)
      } else {
        mensajeText = util.cargaMensaje(200,'Envío Satisfactorio')
      }
    }).promise();
    return mensajeText;
  }
  catch(err){
    util.insertLog("Error en sqsManager.sendMessage: " + err);  
    mensajeText = util.cargaMensaje(500,"" + err)
    return mensajeText;
  }
};

const daoManager = require("./../utilities/daoManager");
const util = require("./../utilities/common")
const sqsManager = require("./../utilities/sqsManager");

const auditoryDto = require("./../contracts/auditoryDto");
const messageRequestDto = require("./../contracts/messageRequestDto");

var AWS = require("aws-sdk");

const personasTable = process.env.TABLA_PERSONA;
const auditoriaCola = process.env.QUEUE_AUDITORY;

module.exports.handler = async(event, context) => {

    try {
        var data = JSON.parse(event.body);
        var msgId = context.awsRequestId;
        var params = { TableName: personasTable, Item: data };

        var docClient = new AWS.DynamoDB.DocumentClient();

        var params1Persons = {
            TableName: "PersonaTables",
            Key: {
                "identificacion": data.identificacion,
            }
        };

        var mensajePersona;
        await docClient.get(params1, function(err, data1) {
            if (err) {
                mensajePersona = util.cargaMensaje(201, err);
            } else {
                mensajePersona = util.cargaMensaje(200, data1);
            }
        }).promise();


        var infoRequest = new messageRequestDto();
        util.insertLog("Objeto para BD: " + JSON.stringify(params));

        var infoAuditory = new auditoryDto(msgId, "Init", infoRequest, {});
        sqsManager.sendMessage(context, infoAuditory, auditoriaCola);

        const response = await daoManager.register(context, params);
        util.insertLog("Result Insert BD: " + JSON.stringify(response));
        return response;

    } catch (err) {
        util.insertLog("Error en personasControllerHandler: " + err);
        return util.cargaMensaje(500, "" + err);
    }
};
const daoManager = require("../utilities/daoManager");
const util = require("../utilities/common")
const sqsManager = require("../utilities/sqsManager");

const auditoryDto = require("../contracts/auditoryDto");
const messageRequestDto = require("../contracts/messageRequestDto");

const AWS = require("aws-sdk");

const asistenciatable = process.env.TABLA_ASISTENCIA;
const auditoriaCola = process.env.QUEUE_AUDITORY;

module.exports.handler = async(event, context) => {

    try {
        var data = JSON.parse(event.body);
        var msgId = context.awsRequestId;
        var params = { TableName: asistenciatable, Item: data };

        var infoRequest = new messageRequestDto();
        util.insertLog("Objeto para BD: " + JSON.stringify(params));

        var infoAuditory = new auditoryDto(msgId, "Init", infoRequest, {});
        sqsManager.sendMessage(context, infoAuditory, auditoriaCola);

        const response = await daoManager.register(context, params);
        util.insertLog("Result Insert BD: " + JSON.stringify(response));
        return response;

    } catch (err) {
        util.insertLog("Error en asistenciaControllerHandler: " + err);
        return util.cargaMensaje(500, "" + err);
    }
};
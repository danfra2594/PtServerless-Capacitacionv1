const messageResponseDto = require("./../contracts/messageResponseDto");

module.exports.cargaMensaje = function (codigo, messageInfo) {
    let response = {
        statusCode: codigo,
        body: JSON.stringify(messageInfo),
    };
    
    return response;
};

module.exports.insertLog = function(messageInfo){
    console.log(messageInfo);
}

module.exports.cargaClientResponse = function(code, errorMessage, request, data){
    var response = new messageResponseDto();
    response.success = (code == 200);
    response.code = code;
    response.errors = errorMessage;
    response.request = request;
    response.data = data;
   
    return {
        statusCode: code,
        body: JSON.stringify(response),
    };
}

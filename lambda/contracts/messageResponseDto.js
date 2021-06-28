class messageResponseDto {
  constructor(success, code, data, errors, request){
    this.success = success;
    this.code = code;
    this.data  = data;
    this.errors  = errors;
    this.request = request;
  }
};

module.exports = messageResponseDto;

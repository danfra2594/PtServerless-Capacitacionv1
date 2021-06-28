class messageRequestDto {
  constructor(company, clientDocumentId, clientName, loteId){
    this.company = company;
    this.clientDocumentId = clientDocumentId;
    this.clientName  = clientName;
    this.loteId  = loteId ;
  }

  isLoad(info){
    this.company = info.company ? info.company : "";
    this.clientDocumentId = info.clientDocumentId ? info.clientDocumentId : "";
    this.clientName = info.clientName ? info.clientName : "";
    this.loteId = info.loteId ? info.loteId : "";

    return this.company != "" && this.company != undefined &&
          this.clientDocumentId != "" && this.clientDocumentId != undefined &&
          this.clientName != "" && this.clientName != undefined;
  }
};

module.exports = messageRequestDto;
class auditoryDto {
    constructor(id, state, request, response) {
        var currentDate = new Date().toISOString();

        this.id = id;
        this.state = state;
        this.request = request;
        this.response = response;
        this.registerDate = currentDate;
        this.stateDate = currentDate;
    }
};

module.exports = auditoryDto;
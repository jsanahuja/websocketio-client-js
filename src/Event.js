var Event = function(event, data){
    this.event = event;
    this.data = data;

    this.encode = function(){
        return JSON.stringify([this.event].concat(this.data));
    };
};
Event.decode = function(data) {
    try {
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
        if (Array.isArray(data)) {
            var event = data.shift();
            if (typeof event === 'string') {
                return new Event(event, data);
            }
        }
    } catch (e) {
        throw "Invalid event format: " + e;
    }
    throw "Invalid event format";
};

export default Event;

import Event from './Event.js';

var Emitter = function(){
    this.handlers = {};

    this.on = function(event, closure){
        this.handlers[event] = closure;
    };

    this.off = function(event){
        if (typeof this.handlers[event] !== "undefined") {
            delete this.handlers[event];
        }
    };

    this.trigger = function(event){
        if (event instanceof Event) {
            if (typeof this.handlers[event.event] !== "undefined"){
                this.handlers[event.event].apply(null, event.data);
            }
        } else {
            this.trigger(new Event('error', ['Invalid event for trigger method']));
        }
    };
}

export default Emitter;

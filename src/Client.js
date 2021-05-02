import Emitter from './Emitter.js';
import Event from './Event.js';

var Client = function(url){
    Emitter.call(this);
    this.socket = new WebSocket(url);

    var self = this;

    this.socket.onopen = function(event){
        console.log("[WebSocketIO] Connected");
    };

    this.socket.onmessage = function(e){
        console.log("[WebSocketIO] Recv:", e.data);
        try {
            var event = Event.decode(e.data);
            self.trigger(event);
        } catch (exception) {
            self.trigger(new Event('error', ['Invalid payload received:' + e]));
        }
    };

    this.socket.onclose = function(event){
        if (event.wasClean) {
            console.log("[WebSocketIO] Closed:", event.code, event.reason);
        } else {
            console.log("[WebSocketIO] Died:", event);
        }
        self.trigger(new Event('disconnected', [event.code, event.reason]));
    };
    
    this.socket.onerror = function(event) {
        console.error("[WebSocketIO] Error:", event, arguments);
        self.trigger(new Event('error', ['WebSocket error']));
    };

    this.emit = function() {
        var event = Event.decode(Array.from(arguments));
        console.log("[WebSocketIO] Send:", event.encode());
        this.socket.send(event.encode());
    };
};

export default Client;

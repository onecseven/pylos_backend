"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bus = void 0;
class Bus {
    constructor() {
        this.event_list = {};
    }
    subscribe(event_name, cb) {
        //check events for event name
        let index;
        let event_set = this.event_list[event_name];
        if (event_name in this.event_list) {
            event_set.add(cb);
        }
        else {
            console.log("event '%s' not found", event_name);
        }
        return () => {
            event_set.delete(cb);
        };
    }
    register(event) {
        if (!(event in this.event_list))
            this.event_list[event] = new Set();
        return (payload) => {
            this.emit(event, payload);
        };
    }
    emit(event, payload) {
        if (event in this.event_list) {
            this.event_list[event].forEach(f => {
                if (f)
                    f(payload);
            });
        }
    }
}
exports.Bus = Bus;

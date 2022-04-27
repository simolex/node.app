const EventEmitter = require("events");

const emitter = new EventEmitter();

class Logger extends EventEmitter {
  log = (msg) => {
    console.log(msg);
    this.emit("some_event", { id: 1, text: "Event test!" });
  };
}

module.exports = Logger;

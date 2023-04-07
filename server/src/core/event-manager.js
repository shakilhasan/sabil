const EventEmitter = require("events");

class EventManager {
  constructor() {
    if (!EventManager.instance) {
      EventManager.instance = new EventEmitter();
    }
  }

  getInstance() {
    return EventManager.instance;
  }
}

module.exports = new EventManager();

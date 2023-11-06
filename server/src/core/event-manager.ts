import EventEmitter from "events";

class EventManager {
  constructor() {
    // if (!EventManager.instance) {//TODO: uncomment later
    //   EventManager.instance = new EventEmitter();
    // }
  }

  getInstance() {
    // return EventManager.instance;//TODO: uncomment later
  }
}

module.exports = new EventManager();

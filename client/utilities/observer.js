class Observer {
  constructor(callbacksToTrigger = []) {
    this.callbacksToTrigger = callbacksToTrigger;
  }
  triggerCallbacks(eventType) {
    if (Object.keys(this.callbacksToTrigger).length === 0) {
      return;
    }
    callbacks = this.callbacksToTrigger[eventType];
    for (let i = 0, l = callbacks.length; i < l; i++) {
      callbacks[i]();
    }
  }
  attachCallback(eventType, callback) {
    this.callbacksToTrigger[eventType].push(callback);
  }
}

export default Observer;

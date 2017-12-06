const events = {};

export function addEvent(event, listener) {
  if (!events[event]) {
    events[event] = [];
  }
  if (!events[event].includes(listener)) {
    events[event].push(listener);
  }
}

export function removeEvent(event, listener) {
  if (!events[event]) {
    return;
  }
  const index = events[event].indexOf(listener);
  if (index > -1) {
    events[event].splice(index, 1);
  }
}

export function dispatchEvent(event, payload = {}) {
  const listeners = events[event];
  if (!listeners) {
    return;
  }
  for (let i = 0, l = listeners.length; i < l; i += 1) {
    listeners[i](payload);
  }
}

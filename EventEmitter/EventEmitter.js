class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach(listener => listener(...args));
    }
  }
}

const event = new EventEmitter();

event.on('click', value =>
  console.log('The event click will be invoke with value - ' + value)
);
event.on('push', (to, value) =>
  console.log('Push value - ' + value + ', to - ' + to)
);

event.emit('click', 123);
event.emit('click', 'this value');
event.emit('click', 123455647);

event.emit('push', 'home', 'child');
event.emit('push', 'school', 'pupil', 'dog');

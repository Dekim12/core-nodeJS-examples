const EventEmitter = require('events');

class Timer extends EventEmitter {
  constructor(total) {
    super();

    this.total = total;
    this.ticks = 0;
  }

  start() {
    this.interval = setInterval(() => this.tick(), 1000);
    this.emit('start');
  } 

  tick() {
    this.ticks += 1;

    if (this.ticks <= this.total) {
      this.emit('tick', this.ticks);
    } else {
      this.end();
    }
  }

  end() {
    clearInterval(this.interval);
    this.emit('end');
  }
}

const timer = new Timer(10);

timer.once('start', () => console.log('Timer starts'));
timer.on('tick', (tick = 0) => console.log(tick));
timer.once('end', () => console.log('Timer stops'));

timer.start();

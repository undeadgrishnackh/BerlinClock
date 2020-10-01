class SecondsModule {
  // TODO: we don't have a light number here
  YELLOW_LIGHT = 'Y';

  OFF_LIGHT = 'O';

  constructor(time) {
    this.time = time;
  }

  isEven = (number) => number % 2 === 0;

  render = () => (this.isEven(this.time.seconds()) ? this.YELLOW_LIGHT : this.OFF_LIGHT);
}

module.exports.SecondsModule = SecondsModule;

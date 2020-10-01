const { SecondsModule } = require('./SecondsModule');

class BerlinClock {
  NUMBER_OF_LIGHTS_IN_THE_TOP_ROW = 4;

  NUMBER_OF_LIGHTS_IN_THE_SECOND_ROW = 4;

  NUMBER_OF_LIGHTS_IN_THE_THIRD_ROW = 11;

  NUMBER_OF_LIGHTS_IN_THE_BOTTOM_ROW = 4;

  RED_LIGHT = 'R';

  YELLOW_LIGHT = 'Y';

  OFF_LIGHT = 'O';

  constructor(time) {
    this.time = time;
    this.roundLightOnTop = new SecondsModule(time);
    // TODO: Next refactor cycle is to create the other modules...
    // create hours modules  (constructor + render)
    // create minutes modules(constructor + render)
  }

  render() {
    return [
      this.roundLightOnTop.render(),
      this.topRow(),
      this.secondRow(),
      this.thirdRow(),
      this.bottomRow(),
    ].join('\n');
  }

  topRow() {
    return this.renderRow(
      this.NUMBER_OF_LIGHTS_IN_THE_TOP_ROW,
      Math.floor(this.time.hours() / (this.NUMBER_OF_LIGHTS_IN_THE_SECOND_ROW + 1)),
      this.RED_LIGHT
    );
  }

  secondRow() {
    return this.renderRow(
      this.NUMBER_OF_LIGHTS_IN_THE_SECOND_ROW,
      this.time.hours() % (this.NUMBER_OF_LIGHTS_IN_THE_SECOND_ROW + 1),
      this.RED_LIGHT
    );
  }

  bottomRow() {
    return this.renderRow(
      this.NUMBER_OF_LIGHTS_IN_THE_BOTTOM_ROW,
      this.time.minutes() % (this.NUMBER_OF_LIGHTS_IN_THE_BOTTOM_ROW + 1),
      this.YELLOW_LIGHT
    );
  }

  thirdRow() {
    return this.changeQuarterLightsToRed(
      this.renderRow(
        this.NUMBER_OF_LIGHTS_IN_THE_THIRD_ROW,
        Math.floor(this.time.minutes() / (this.NUMBER_OF_LIGHTS_IN_THE_BOTTOM_ROW + 1)),
        this.YELLOW_LIGHT
      )
    );
  }

  changeQuarterLightsToRed = (thirdRowLights) => {
    const positionOfQuarterRedLights = 3;
    return thirdRowLights
      .split('')
      .map((char, index) =>
        !((index + 1) % positionOfQuarterRedLights !== 0) && char === this.YELLOW_LIGHT
          ? this.RED_LIGHT
          : char
      )
      .join('');
  };

  renderRow = (numberOfLights, numberOfLightsOn, color) =>
    color.repeat(numberOfLightsOn) + this.OFF_LIGHT.repeat(numberOfLights - numberOfLightsOn);
}

module.exports.BerlinClock = BerlinClock;

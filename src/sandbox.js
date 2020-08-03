// Function to solve the kata
function berlinClock(time) {
  if (isTimeValid(time)) {
    return new BerlinClock(new ParsedTime(time)).render();
  }
  return 'error';
}

// --------------------------------------------------------------- TIME
//TODO: use the regexp to validate and split the sec, hou, min...
const VALID_TIME_PATTERN = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$')
const isTimeValid = time => VALID_TIME_PATTERN.test(time);

//TODO: is this a parser only or the class time itself?
class ParsedTime {
  
  constructor(time) {
      this.parts = time.split(":")
//    this.parts =  VALID_TIME_PATTERN.exec(time).shift();   
  }

  seconds = () => this.parts[2]; 
  minutes = () => this.parts[1];
  hours = () => this.parts[0];
}


// --------------------------------------------------------------- CLOCK
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
  }

  //---SECONDS
  isEven = (number) => (number % 2 === 0);
  roundLightOnTop() {
    return this.isEven(this.time.seconds()) ? this.YELLOW_LIGHT : this.OFF_LIGHT;
  }

  //--- HOURS

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

  // MINUTES

  bottomRow() {
    return this.renderRow(
      this.NUMBER_OF_LIGHTS_IN_THE_BOTTOM_ROW,
      this.time.minutes() % (this.NUMBER_OF_LIGHTS_IN_THE_BOTTOM_ROW + 1),
      this.YELLOW_LIGHT
    );
  };

  thirdRow() {
    return this.changeQuarterLightsToRed(
      this.renderRow(
        this.NUMBER_OF_LIGHTS_IN_THE_THIRD_ROW,
        Math.floor(this.time.minutes() / (this.NUMBER_OF_LIGHTS_IN_THE_BOTTOM_ROW + 1)),
        this.YELLOW_LIGHT
      )
    );
  };


  changeQuarterLightsToRed = (thirdRowLights) => {
    const positionOfQuarterRedLights = 3;
    return thirdRowLights
      .split('')
      .map((char, index) => ((index + 1) % positionOfQuarterRedLights === 0 && char === this.YELLOW_LIGHT) ? this.RED_LIGHT : char)
      .join("");
  }
  
  // TODO extract into class
  renderRow = (numberOfLights, numberOfLightsOn, color) => {
    return color.repeat(numberOfLightsOn) + this.OFF_LIGHT.repeat(numberOfLights - numberOfLightsOn);
  }


  render() {
    return [
      this.roundLightOnTop(),
      this.topRow(),
      this.secondRow(),
      this.thirdRow(),
      this.bottomRow()
    ].join("\n");
  };
}

module.exports.berlinClock = berlinClock;







// class BerlinClock {
//   constructor (time) {
//     parsedTime = new ParsedTime(time)
//     this.rendered = new Joined([
//         new Flattened(
//           new SingltonCollection(new RoundTopLight(parsedTime)),
//           new HoursRows(parsedTime),
//           new Minutes(parsedTime)
//         )
//       ],
//       "\n"
//     );
//   }

//   render() {
//     return this.rendered.toString();
//   }
// }
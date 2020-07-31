const VALID_TIME_PATTERN = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$')


class ParsedTime {
  constructor(time) {
    this.time = time;
  }

  seconds = () => this.time.split(":")[2];
  minutes = () => this.time.split(":")[1];
  hours = () => this.time.split(":")[0];
}

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


function berlinClock(time) {

  if (VALID_TIME_PATTERN.test(time)) {
    return new BerlinClock(new ParsedTime(time)).render();
  }
  return 'error';
}


const RED_LIGHT = 'R';
const YELLOW_LIGHT = 'Y';
const OFF_LIGHT = 'O';

const numberOfLightOfTheBottomRow = 4;


//TODO: are these two methods something ahve we to move into the berlin clock class?
const changeQuarterLightsToRed = (thirdRowLights) => {
  const positionOfQuarterRedLights = 3;
  return thirdRowLights
    .split('')
    .map((char, index) => ((index + 1) % positionOfQuarterRedLights === 0 && char === YELLOW_LIGHT) ? RED_LIGHT : char)
    .join("");
}

//TODO: we missed to use this method into the minutes component... let it here and go for further invesdtigation later
const renderRow = (numberOfLights, numberOfLightsOn, color) => {
  return color.repeat(numberOfLightsOn) + OFF_LIGHT.repeat(numberOfLights - numberOfLightsOn);
}



//class BerlinClock
class BerlinClock {
  //---INIT
  constructor(time) {
    this.time = time;
  }

  //---SECONDS
  isEven = (number) => (number % 2 === 0);
  roundLightOnTop() {
    return this.isEven(this.time.seconds()) ? YELLOW_LIGHT : OFF_LIGHT; //TODO: bring these constants inside the class
  }

  //--- HOURS
  numberOfLightOfTheSecondRow = 4;

  topRow() {
    return renderRow(
      4,
      Math.floor(this.time.hours() / (this.numberOfLightOfTheSecondRow + 1)),
      RED_LIGHT
    );
  }

  secondRow() {
    return renderRow(
      this.numberOfLightOfTheSecondRow,
      this.time.hours() % (this.numberOfLightOfTheSecondRow + 1),
      RED_LIGHT
    );
  }

  bottomRow() {
    const numberOfLights = numberOfLightOfTheBottomRow; //TODO: maybe extract it into global to see the composition of the clock
    const numberOfLightsOn = this.time.minutes() % (numberOfLights + 1);
    return YELLOW_LIGHT.repeat(numberOfLightsOn) + OFF_LIGHT.repeat(numberOfLights - numberOfLightsOn);
  };

  thirdRow() {
    const numberOfLights = 11;
    const numberOfLightsOn = Math.floor(this.time.minutes() / (numberOfLightOfTheBottomRow + 1));
    const thirdRowLights = YELLOW_LIGHT.repeat(numberOfLightsOn) + OFF_LIGHT.repeat(numberOfLights - numberOfLightsOn);
    return changeQuarterLightsToRed(thirdRowLights);
  };

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
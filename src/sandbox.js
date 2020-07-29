const VALID_TIME_PATTERN = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$')

function berlinClock (time) {
  if (VALID_TIME_PATTERN.test(time)) {
    const seconds = getSeconds(time);
    const minutes = getMinutes(time);
    const hours = getHours(time);
    const berlinClock = new BerlinClock(seconds, hours);

    return [
      berlinClock.getRoundLightOnTop(),
      berlinClock.getTopRow(),
      berlinClock.getSecondRow(),
      renderThirdRow(minutes),
      renderBottomRow(minutes)
    ].join("\n");  // return berlinClock.getLights();
  }
  return 'error';
}


const getSeconds = (time) => time.split(":")[2];
const getMinutes = (time) => time.split(":")[1];
const getHours   = (time) => time.split(":")[0];


const RED_LIGHT    = 'R';
const YELLOW_LIGHT = 'Y';
const OFF_LIGHT    = 'O';

const numberOfLightOfTheBottomRow = 4;


const renderBottomRow = (minutes) => {
  const numberOfLights = numberOfLightOfTheBottomRow; //TODO: maybe extract it into global to see the composition of the clock
  const numberOfLightsOn = minutes % (numberOfLights + 1);
  return YELLOW_LIGHT.repeat(numberOfLightsOn) + OFF_LIGHT.repeat(numberOfLights - numberOfLightsOn);
};

const renderThirdRow = (minutes) => {
  const numberOfLights = 11;
  const numberOfLightsOn = Math.floor(minutes / (numberOfLightOfTheBottomRow + 1));
  const thirdRowLights = YELLOW_LIGHT.repeat(numberOfLightsOn) + OFF_LIGHT.repeat(numberOfLights - numberOfLightsOn);
  return changeQuarterLightsToRed(thirdRowLights);
};

const changeQuarterLightsToRed = (thirdRowLights) => {
  const positionOfQuarterRedLights = 3; 
  return thirdRowLights
    .split('')
    .map( (char, index) => ((index + 1) % positionOfQuarterRedLights === 0 && char === YELLOW_LIGHT) ?  RED_LIGHT : char)
    .join("");
}

//TODO: we missed to use this method into the minutes component... let it here and go for further invesdtigation later
const renderRow = (numberOfLights, numberOfLightsOn, color) => {
  return color.repeat(numberOfLightsOn) + OFF_LIGHT.repeat(numberOfLights - numberOfLightsOn);  
}



//class BerlinClock
class BerlinClock {
    //---INIT
    constructor(seconds, hours, mins) {
      this.seconds = seconds;
      this.hours   = hours;    
    }

    //---SECONDS
    isEven = (number) => ( number % 2 === 0);
    getRoundLightOnTop() {
      return this.isEven(this.seconds) ?  YELLOW_LIGHT : OFF_LIGHT; //TODO: bring these constants inside the class
    }

    //--- HOURS
    numberOfLightOfTheSecondRow = 4;
    
    getTopRow() {
      return renderRow(
        4, 
        Math.floor(this.hours / (this.numberOfLightOfTheSecondRow + 1)), 
        RED_LIGHT
      );
    }

    getSecondRow() {
      return renderRow(
        this.numberOfLightOfTheSecondRow,
        this.hours % (this.numberOfLightOfTheSecondRow + 1),
        RED_LIGHT
      );  
    }
}

module.exports.berlinClock = berlinClock;
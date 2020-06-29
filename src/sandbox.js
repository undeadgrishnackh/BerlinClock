function berlinClock (time) {
  if (isAValidTime(time)) {
    //TODO: the minutes are swapped with the HOURS!
    let dashboard = renderSeconds(getSeconds(time)) + "\n" + //seconds
                    render5Hours(getHours(time)) + "\n" +                          //5-hours
                    renderHours(getHours(time)) + "\n" +                          //hours
                    render5Minutes(getMinutes(time)) + "\n" +                   //5-minutes  YYRYYRYYRYY
                    renderMinutes(getMinutes(time));         //minutes
    return dashboard;
  }
  return 'error';
}

function isAValidTime(time) {
  let timeMask = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$');

  if (time === undefined || time === '' || !timeMask.test(time)) return false;
  return true;
}


function getSeconds(time) {
  return time.split(":")[2];
};
function getMinutes(time) {
  return time.split(":")[1];
};
function getHours(time) {
  return time.split(":")[0];
};


function renderSeconds(sec) {
  if ( sec % 2 === 0) return "Y";
  return "O";
};
function renderMinutes(minutes) {
  let lightsOn = minutes % 5;
  return "Y".repeat(lightsOn) + "O".repeat(4 - lightsOn);
};
function render5Minutes(minutes) {
  let yellowLightsOn = Math.floor(minutes / 5);
  return ("Y".repeat(yellowLightsOn) + "O".repeat(11 - yellowLightsOn))
    .split('')
    .map( (char, index) => ((index + 1) % 3 === 0 && char === 'Y') ?  'R' : char)
    .join("");
};  

function renderHours(hours) {
  let lightsOn = hours % 5;
  return "R".repeat(lightsOn) + "O".repeat(4 - lightsOn);  
}

function render5Hours(hours) {
  let lightsOn = Math.floor(hours / 5);
  return "R".repeat(lightsOn) + "O".repeat(4 - lightsOn);  
}

module.exports.berlinClock = berlinClock;
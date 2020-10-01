const { BerlinClock } = require('./BerlinClock');
const { ParsedTime } = require('./Parsed-time');

const berlinClock = (time) => {
  try {
    return new BerlinClock(new ParsedTime(time)).render();
  } catch (e) {
    return 'error';
  }
};

module.exports.berlinClock = berlinClock;
